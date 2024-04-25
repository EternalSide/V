import {HomeFiltersTypes, SideBarLinksType} from "@/types";
import {Home, PlusSquare, Star, Smile, Users} from "lucide-react";

export const sidebarLinks: SideBarLinksType[] = [
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

	{
		label: "Сообщества",
		route: "/tags",
		icon: Users,
		auth: false,
	},
];

export const homeFilters: HomeFiltersTypes[] = [
	{
		value: "new",
		label: "Новое",
	},
	{
		value: "recommended",
		label: "Рекомендованное",
	},
	{
		value: "popular",
		label: "Популярное",
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
