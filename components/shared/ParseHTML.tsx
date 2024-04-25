"use client";
import {useEffect} from "react";
import Prism from "prismjs";
import parse, {domToReact} from "html-react-parser";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
	data: string;
	post?: boolean;
	info?: boolean;
	comment?: boolean;
}

const ParseHTML = ({data, post, info, comment}: Props) => {
	useEffect(() => {
		Prism.highlightAll();
	}, [data]);

	const options = {
		// Перебить стили
		replace: (domNode: any) => {
			if (domNode.name === "p") {
				return (
					<p
						className={`mb-3 w-full text-lg ${
							info && "mt-4 !text-sm text-zinc-300"
						}  ${comment && "!text-[16px]"} `}
						style={{fontSize: 18}}
					>
						{domToReact(domNode.children, options)}
					</p>
				);
			}
			if (domNode.name === "h2" || domNode.name === "h3") {
				return (
					<h3 className='mb-3 mt-8 text-3xl font-bold'>
						{domToReact(domNode.children, options)}
					</h3>
				);
			}
		},
	};

	return (
		<div className={`${post && "mb-6 mt-10"} w-full min-w-full  max-w-full`}>
			{parse(data, options)}
		</div>
	);
};
export default ParseHTML;
