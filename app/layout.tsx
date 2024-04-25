import "./globals.css";
import "../styles/prism.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {EdgeStoreProvider} from "@/lib/edgestore";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {ruRU} from "@clerk/localizations";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "V",
	description:
		"V — платформа, где пользователи могут находить интересующие их статьи по выбранным темам, общаться с единомышленниками, делиться статьями с друзьями или подписчиками.",
	icons: {
		icon: "/favicon.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<ClerkProvider
					appearance={{
						baseTheme: dark,
						elements: {
							formButtonPrimary: "bg-indigo-700 hover:bg-indigo-800",
							footerActionLink: "text-indigo-500 hover:text-indigo-400",
						},
					}}
					localization={ruRU}
				>
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
