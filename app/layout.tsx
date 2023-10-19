import {ChildrenProps} from "@/types";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import {EdgeStoreProvider} from "@/lib/edgestore";
import {ruRU} from "@clerk/localizations";
import {dark} from "@clerk/themes";
import "../styles/prism.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "V",
	openGraph: {
		images: "/favicon.png",
	},
	description:
		"V — платформа, где пользователи могут находить интересующие их статьи по выбранным темам, общаться с единомышленниками, делиться статьями с друзьями или подписчиками.",
	icons: {
		icon: "/favicon.png",
	},
};

export default async function RootLayout({children}: ChildrenProps) {
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
