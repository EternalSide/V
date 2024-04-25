import {Home, PlusSquare, Star, Smile} from "lucide-react";

export const sidebarLinks = [
	{
		label: "Главная",
		route: "/",
		icon: Home,
		auth: false,
	},
	{
		label: "Профиль",
		route: "/",
		icon: Smile,
		auth: true,
	},
	{
		label: "Избранное",
		route: "/favourites",
		icon: Star,
		auth: true,
	},
	{
		label: "Новый пост",
		route: "/create",
		icon: PlusSquare,
		auth: true,
	},
];

export const editorPlugins = [
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
];
