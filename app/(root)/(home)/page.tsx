import PostCard from "@/components/cards/PostCard";

export default function Home() {
  const active = "Рекомендованное";
  return (
    <main className="pt-4">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold">Рекомендованное</h3>
        <h3 className="text-lg text-neutral-300">Новое</h3>
        <h3 className="text-lg text-neutral-300">Топ</h3>
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <PostCard firstPost={true} />
        <PostCard /> <PostCard /> <PostCard /> <PostCard />
      </div>
    </main>
  );
}
