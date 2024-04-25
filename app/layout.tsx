import "./globals.css";
import "../styles/prism.css";
import {ChildrenProps} from "@/types";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {EdgeStoreProvider} from "@/lib/edgestore";

import CustomClerkProvider from "@/providers/CustomClerkProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "V",
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
				<CustomClerkProvider>
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
				</CustomClerkProvider>
			</body>
		</html>
	);
}
