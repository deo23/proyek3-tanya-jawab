import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/api/rapidapi",
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
    "/ask-question",
    "/api/getQuestionById",
    "/api/answers",
    "/api/answers/getAnswer",
    "/api/getAnswer",
    "/api/user",
    "/api/questions",
    "/collection",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/openai", "/api/rapidapi"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};