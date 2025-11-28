import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
]);

// Create Arcjet middleware with fallback
const aj = arcjet({
    key: process.env.ARCJET_KEY || "test-key", // Fallback for development
    // characteristics: ["userId"], // Track based on Clerk userId
    rules: [
        // Shield protection for content and security
        shield({
            mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
        }),
        detectBot({
            mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN", // Use DRY_RUN in development
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "GO_HTTP", // For Inngest
                // See the full list at https://arcjet.com/bot-list
            ],
        }),
    ],
});

// Create base Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    if (!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }

    return NextResponse.next();
});

// Chain middlewares - ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
