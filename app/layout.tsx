import { ChildrenProps } from "@/types";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
	title: "V",
	description: "Vendetta",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({ children }: ChildrenProps) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
			localization={ruRU}
		>
			<html lang='ru'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
