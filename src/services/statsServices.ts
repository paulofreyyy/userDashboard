import { Stats } from '../types';
import api from './api';

export const fetchStats = async (): Promise<Stats> => {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            api.get('/users'),
            api.get('/posts'),
            api.get('/comments'),
        ]);

        localStorage.setItem('users', JSON.stringify(usersResponse.data));
        localStorage.setItem('posts', JSON.stringify(postsResponse.data));
        localStorage.setItem('comments', JSON.stringify(commentsResponse.data));

        return {
            totalUsers: usersResponse.data.length,
            totalComments: commentsResponse.data.length,
            totalPosts: postsResponse.data.length,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw new Error('Unable to fetch stats');
    }
};