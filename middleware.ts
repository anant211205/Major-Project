import arcjet, { detectBot, shield } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
]);

// Create Arcjet instance
const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "GO_HTTP", // For Inngest
            ],
        }),
    ],
});

export default clerkMiddleware(async (auth, req: NextRequest) => {
    // Run Arcjet protection
    const decision = await aj.protect(req);
    
    if (decision.isDenied()) {
        return new Response("Forbidden", { status: 403 });
    }

    // Handle Clerk authentication
    const { userId } = await auth();

    if (!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};