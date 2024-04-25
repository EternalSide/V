import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

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
export function formatDate(inputDate: Date): string {
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
