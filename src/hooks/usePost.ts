import { useEffect, useState } from "react";
import { Post, UserPostCount } from "../types";
import { fetchPostsByUser } from "../services/postService";

export const usePost = () => {
    const [postCounts, setPostCounts] = useState<UserPostCount[]>([]);

    // Buscar os dados das postagens
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts: Post[] = await fetchPostsByUser();

                // Contabilizar o número de postagens por usuário
                const counts = posts.reduce((acc: Record<number, number>, post: Post) => {
                    acc[post.userId] = (acc[post.userId] || 0) + 1;
                    return acc;
                }, {});

                // Transformar o objeto em um array de UserPostCount
                const postCountArray = Object.entries(counts).map(([userId, postCount]) => ({
                    userId: parseInt(userId),
                    postCount,
                }));

                setPostCounts(postCountArray);
            } catch (error) {
                console.error('Error fetching posts for chart:', error);
            }
        };

        fetchPosts();
    }, []);

    return {
        postCounts
    }
}