import { ChildrenProps } from "@/types";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import "../styles/prism.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Pusher from "@/providers/Notifications";
import { getUserById } from "@/lib/actions/user.action";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "V",
  openGraph: {
    images: "/favicon.png",
  },
  twitter: {
    images: "/favicon.png",
  },
  description:
    "V — платформа, где пользователи могут находить интересующие их статьи по выбранным темам, общаться с единомышленниками, делиться статьями с друзьями или подписчиками.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children }: ChildrenProps) {
  return (
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
      <html lang="ru">
        <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
