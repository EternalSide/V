import Image from "next/image";

interface UserAvatarProps {
  imgUrl: string;
  imageClassNames?: string;
  classNames?: string;
  alt?: string;
}

export function UserAvatar({
  imgUrl,
  classNames,
  imageClassNames,
  alt,
}: UserAvatarProps) {
  return (
    <div className={`relative ${classNames}`}>
      <Image
        src={imgUrl}
        fill
        alt={`Аватар Пользователя ${alt}`}
        className={`rounded-full object-cover ${imageClassNames}`}
      />
    </div>
  );
}
