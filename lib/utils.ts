import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Дата публикации поста.
export function getTimestamp(createdAt: Date): string {
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const date = new Date(createdAt);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${hours}:${minutes}`;
}

// Дата регистрации профиля
export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const monthNames = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const year = date.getFullYear();
  const month = date.getMonth();

  return `${monthNames[month]} ${year}`;
}

export const formUrlQuery = ({ params, key, value }: any) => {
  // Разобрать фул строку со всеми параметрами.
  const currentUrl = qs.parse(params);

  // Поменять значение, которое фильтруем
  currentUrl[key] = value;

  // Склеить обратно.
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    },
  );
};

export const formatedLink = (link: string) => {
  if (link.includes("https://")) {
    return link.replace("https://", "");
  }
  if (link.includes("http://")) {
    return link.replace("http://", "");
  }
  if (!link.includes("http://") || !link.includes("https://")) {
    return link;
  }
};
