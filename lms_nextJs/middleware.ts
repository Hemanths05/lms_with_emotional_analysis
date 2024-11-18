import {authMiddleware} from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/browse",
    "/course-preview/(.*)",
    "/",
    "/api/savePayment"
  ],
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};