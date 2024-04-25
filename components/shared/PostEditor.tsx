"use client";
import {Editor} from "@tinymce/tinymce-react";

const PostEditor = ({field, editorRef, height}: any) => {
	return (
		<Editor
			apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
			value={field?.value || ""}
			onInit={(editor) => (editorRef.current = editor)}
			onBlur={field.onBlur}
			onEditorChange={(content) => field.onChange(content)}
			init={{
				height: height ? height : 850,
				menubar: false,
				plugins: [
					"advlist",
					"autolink",
					"lists",
					"link",
					"image",
					"charmap",
					"preview",
					"anchor",
					"searchreplace",
					"visualblocks",
					"codesample",
					"fullscreen",
					"insertdatetime",
					"media",
					"table",
				],
				toolbar:
					"undo redo | " +
					"codesample | bold italic forecolor | alignleft aligncenter |" +
					"alignright alignjustify | bullist numlist",
				content_style: "body { font-family:Inter; font-size:16px }",
				skin: "oxide-dark",
				content_css: "dark",
			}}
		/>
	);
};
export default PostEditor;
