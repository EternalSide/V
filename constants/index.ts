import { Home, Tag, Heart, PlusSquare, Cat } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Главная",
    route: "/",
    icon: Home,
  },
  {
    label: "Профиль",
    route: "/",
    icon: Cat,
  },
  {
    label: "Избранное",
    route: "/",
    icon: Heart,
  },
  {
    label: "Новый пост",
    route: "/create",
    icon: PlusSquare,
  },

  {
    label: "Теги",
    route: "/tags",
    icon: Tag,
  },
];
