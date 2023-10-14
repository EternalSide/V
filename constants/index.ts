import { Home, Tag, PlusSquare, Star, Smile } from "lucide-react";

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

  {
    label: "Теги",
    route: "/tags",
    icon: Tag,
    auth: false,
  },
];

export const homeFilters = [
  {
    value: "recommended",
    label: "Рекомендованное",
  },
  {
    value: "new",
    label: "Новые",
  },
  {
    value: "popular",
    label: "Популярные",
  },
];
