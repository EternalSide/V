"use client";
import {Loader2Icon} from "lucide-react";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import PostCard from "./cards/PostCard";
import {getAllPosts, getRecommendedPosts} from "@/lib/actions/post.action";
import {usePathname, useSearchParams} from "next/navigation";
import {getTagInfo} from "@/lib/actions/tag.action";

const InfiniteScroll = ({posts, user, userId, id, tagName, filterValue}: any) => {
	const newPosts = JSON.parse(JSON.stringify(posts));
	const path = usePathname();
	const [initialPosts, setInitianPosts] = useState([...newPosts]);
	const {ref, inView} = useInView();
	const [page, setPage] = useState(1);
	const parsedUser = JSON.parse(user);
	const searchParams = useSearchParams();

	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		if (inView) {
			loadMorePosts();
		}
	}, [inView]);

	useEffect(() => {
		const newData = JSON.parse(JSON.stringify(posts));

		// @ts-ignore
		setInitianPosts([...newData]);
	}, [searchParams, posts, setInitianPosts]);

	const loadMorePosts = async () => {
		try {
			const nextPage = page + 1;
			let posts: any;
			if (id === "tagPage") {
				const tag = await getTagInfo({page: nextPage, tagName});
				posts = tag.posts;
			} else {
				if (searchParams.get("q") === "recommended") {
					// @ts-ignore
					const {posts: data} = await getRecommendedPosts({page: nextPage, userId});
					posts = data;
					console.log("реккомендованые посты");
				} else {
					const {posts: data} = await getAllPosts({page: nextPage, filterValue, path: path});
					posts = data;
					console.log("обычные посты");
				}
			}

			if (posts?.length) {
				setPage(nextPage);
				setInitianPosts((prev: any) => {
					setHasMore(true);

					return [...(prev?.length ? prev : []), ...posts];
				});
			} else {
				setHasMore(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{initialPosts.map((post: any) => (
				<PostCard
					key={Math.random() * 1000}
					userId={userId}
					banner={post?.banner}
					isPostSaved={parsedUser?.savedPosts.includes(post._id)}
					author={{
						name: post.author.name,
						picture: post.author.picture,
						username: post.author.username,
						_id: post.author._id.toString(),
					}}
					post={{
						id: post._id.toString(),
						title: post.title,
						comments: post.comments,
						likes: post.upvotes,
						views: post.views,
						createdAt: post.createdAt,
						tags: post.tags,
					}}
				/>
			))}
			{hasMore ? (
				<Loader2Icon
					ref={ref}
					className='mx-auto my-10 h-10 w-10 animate-spin text-center text-indigo-500'
				/>
			) : (
				<p className='my-10 text-center text-zinc-400'>
					Больше ничего не найдено 😔 <br />
					Попробуйте сменить сообщество или опубликовать новую статью!
				</p>
			)}
		</>
	);
};
export default InfiniteScroll;
