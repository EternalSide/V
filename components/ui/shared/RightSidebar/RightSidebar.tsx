const RightSidebar = () => {
  return (
    <div
      className="sticky right-0 top-0 flex h-fit 
  w-[330px] flex-col overflow-y-auto  text-white dark:shadow-none max-xl:hidden"
    >
      <div className="bg-main flex w-full flex-col rounded-md border border-neutral-800">
        <div className="border-b border-black p-5">
          <h3 className="text-xl font-bold">#Популярное</h3>
        </div>
        <div className="border-b border-black px-5 py-4">
          <p className="text-neutral-200">Мне надоел Реакт...</p>
          <p className="mt-2 text-sm text-neutral-400">Комментариев: 62</p>
        </div>{" "}
        <div className="border-b border-black px-5 py-4">
          <p className="text-neutral-200">Мне надоел Реакт...</p>
          <p className="mt-2 text-sm text-neutral-400">Комментариев: 62</p>
        </div>{" "}
        <div className="border-b border-black px-5 py-4">
          <p className="text-neutral-200">Мне надоел Реакт...</p>
          <p className="mt-2 text-sm text-neutral-400">Комментариев: 62</p>
        </div>{" "}
        <div className="border-b border-black px-5 py-4">
          <p className="text-neutral-200">Мне надоел Реакт...</p>
          <p className="mt-2 text-sm text-neutral-400">Комментариев: 62</p>
        </div>{" "}
        <div className="border-b border-black px-5 py-4">
          <p className="text-neutral-200">Мне надоел Реакт...</p>
          <p className="mt-2 text-sm text-neutral-400">Комментариев: 62</p>
        </div>
      </div>
      <div className="bg-main mt-5 flex w-full flex-col rounded-md border border-neutral-800">
        <div className="border-b border-black p-5">
          <h3 className="text-xl font-bold">#Теги</h3>
        </div>

        <div className="border-b border-black px-5 py-4">
          <p className="font-semibold text-neutral-200">React</p>
          <p className="mt-2 text-sm text-neutral-400">Постов: 62</p>
        </div>
        <div className="border-b border-black px-5 py-4">
          <p className="font-semibold text-neutral-200">React</p>
          <p className="mt-2 text-sm text-neutral-400">Постов: 62</p>
        </div>
        <div className="border-b border-black px-5 py-4">
          <p className="font-semibold text-neutral-200">React</p>
          <p className="mt-2 text-sm text-neutral-400">Постов: 62</p>
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
