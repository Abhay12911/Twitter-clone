import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import {useQuery} from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType}) =>{
	const getPostEndPoint = () =>{
		switch(feedType){
			case "for you" :
				return "/api/posts/all";
			case "following" :
				return "api/posts/following";
			default: 
			return "/api/posts/all";
		}
	};
	const POST_ENDPOINT = getPostEndPoint();

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async()=>{
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if(!res.ok){
					throw new Error(data.error || "something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading &&  !isRefetching && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && POSTS && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;