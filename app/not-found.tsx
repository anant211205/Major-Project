"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link href="/">
        <Button size="lg" className="mt-2">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
