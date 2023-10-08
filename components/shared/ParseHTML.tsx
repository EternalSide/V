"use client";

import { useEffect } from "react";

import Prism from "prismjs";
import parse, { domToReact } from "html-react-parser";

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

const options = {
  // @ts-ignore
  // Перебить стили
  replace: (domNode) => {
    if (domNode.name === "p") {
      return (
        <p className="mt-3 w-full max-w-2xl" style={{ fontSize: 18 }}>
          {domToReact(domNode.children, options)}
        </p>
      );
    }
  },
};

const ParseHTML = ({ data }: { data: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  // @ts-ignore
  return (
    <div className="mt-4 px-14 py-8 max-md:px-6">{parse(data, options)}</div>
  );
};
export default ParseHTML;
