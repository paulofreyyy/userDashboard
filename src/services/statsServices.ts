import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchStats = async () => {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            axios.get(`${BASE_URL}/users`),
            axios.get(`${BASE_URL}/posts`),
            axios.get(`${BASE_URL}/comments`)
        ]);

        const users = usersResponse.data;
        const posts = postsResponse.data;
        const comments = commentsResponse.data;

        //Total counts
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const totalComments = comments.length;

        return {
            totalUsers,
            totalComments,
            totalPosts,
        }

    } catch (error) {

    }
}