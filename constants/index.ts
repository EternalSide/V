import { HomeFiltersTypes, SideBarLinksType } from "@/types";
import { Home, Tag, PlusSquare, Star, Smile, Bell, Send } from "lucide-react";

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
    label: "Теги",
    route: "/tags",
    icon: Tag,
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

export const moreLinks = [
  {
    label: "Уведомления",
    href: "/notifications",
    icon: Bell,
  },
  {
    label: "Telegram",
    href: "https://t.me/j_eternal",
    icon: Send,
  },
];
