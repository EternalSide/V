import {ClerkProvider} from "@clerk/nextjs";
import React from "react";
import {ruRU} from "@clerk/localizations";
import {dark} from "@clerk/themes";
import {ChildrenProps} from "@/types";

const CustomClerkProvider = ({children}: ChildrenProps) => {
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
			{children}
		</ClerkProvider>
	);
};
export default CustomClerkProvider;
