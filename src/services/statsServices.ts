import { Stats } from '../types';
import api from './api';

export const fetchStats = async (): Promise<Stats> => {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            api.get('/users'),
            api.get('/posts'),
            api.get('/comments'),
        ]);

        const users = usersResponse.data;
        const posts = postsResponse.data;
        const comments = commentsResponse.data;

        // Total counts
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const totalComments = comments.length;

        return {
            totalUsers,
            totalComments,
            totalPosts,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw new Error('Unable to fetch stats');
    }
};
