import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/api/webhook", "/:userName", "/post/:postId", "/tags/:name"],
	ignoredRoutes: ["/api/webhook"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
