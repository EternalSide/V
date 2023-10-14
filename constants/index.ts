import { Home, Tag, PlusSquare, Cat, Star } from "lucide-react";

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
    icon: Cat,
    auth: true,
  },
  {
    label: "Избранное",
    route: "/",
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
