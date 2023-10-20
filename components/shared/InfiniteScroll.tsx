"use client";
import {Loader2Icon} from "lucide-react";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import PostCard from "../cards/PostCard";
import {getAllPosts, getRecommendedPosts} from "@/lib/actions/post.action";
import {usePathname, useSearchParams} from "next/navigation";
import {getTagInfo} from "@/lib/actions/tag.action";
import {getUserByUserName} from "@/lib/actions/user.action";

interface Props {
	userId?: string;
	username?: string;
	tagName?: string;
	filterValue?: string;
	user: any;
	posts: any;
	id?: "TagPage" | "ProfilePage" | "MainPage";
	mainId?: string;
}

const InfiniteScroll = ({posts, user, userId, id, tagName, filterValue, username, mainId}: Props) => {
	// const newPosts = JSON.parse(JSON.stringify(posts));
	const path = usePathname();
	const [initialPosts, setInitianPosts] = useState([...posts]);
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
		// const newData = JSON.parse(JSON.stringify(posts));

		setInitianPosts([...posts]);
	}, [searchParams, posts, setInitianPosts]);

	const MainPageDesider = async (nextPage: number, posts: any) => {
		if (searchParams.get("q") === "recommended") {
			const {posts: data} = await getRecommendedPosts({
				userId: !userId ? undefined : userId,
				page: nextPage,
			});
			posts = data;
		} else {
			const {posts: data} = await getAllPosts({page: nextPage, filterValue, path});
			posts = data;
		}
		return posts;
	};

	const loadMorePosts = async () => {
		try {
			const nextPage = page + 1;

			let posts: any = [];

			switch (id) {
				case "TagPage": {
					// @ts-ignore
					const tag = await getTagInfo({page: nextPage, tagName});
					posts = tag.posts;
					break;
				}

				case "ProfilePage": {
					// @ts-ignore
					const user = await getUserByUserName({page: nextPage, username});
					console.log(user);
					posts = user.posts;

					break;
				}

				case "MainPage": {
					const data = await MainPageDesider(nextPage, posts);
					posts = data;
					break;
				}

				default:
					break;
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
					userId={mainId || null}
					banner={post?.banner}
					isPostSaved={parsedUser?.savedPosts.includes(post._id)}
					author={{
						name: post.author.name,
						picture: post.author.picture,
						username: post.author.username,
						_id: post.author?._id ? post.author?._id.toString() : post.author,
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
