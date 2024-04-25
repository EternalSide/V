import Image from "next/image";

interface UserAvatarProps {
	imgUrl: string;
	imageClassNames?: string;
	classNames?: string;
	alt?: string;
	onClick?: any;
}

export function UserAvatar({
	imgUrl,
	classNames,
	imageClassNames,
	alt,
	onClick,
}: UserAvatarProps) {
	return (
		<div
			onClick={onClick}
			className={`relative ${classNames}`}
		>
			<Image
				src={imgUrl}
				fill
				alt={!alt ? "" : alt}
				className={`rounded-full object-cover ${imageClassNames}`}
			/>
		</div>
	);
}
