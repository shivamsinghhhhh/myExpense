import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes to ensure authentication is required
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
  "/settings(.*)", // Added settings route as an example
]);

// Create ArcJet middleware with bot detection and content shielding
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow search engines (Google, Bing, etc)
        "GO_HTTP", // Allow specific HTTP clients like Inngest
        // Add any other allowed categories or bots here
      ],
      block: [
        // You can block specific bots or categories here if needed
        "CATEGORY:BAD_BOTS", // Example of blocking bad bots
      ],
    }),
  ],
});

// Create Clerk middleware to handle user authentication for protected routes
const clerk = clerkMiddleware(async (auth, req) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId && isProtectedRoute(req)) {
      const signInUrl = redirectToSignIn().headers.get("Location");
      return NextResponse.redirect(new URL(signInUrl ?? "/sign-in", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in Clerk Middleware:", error);
    // ✅ Use absolute URL for redirection
    return NextResponse.redirect(new URL("/error", req.url));
  }
});

// Chain middlewares - ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
