import api from './api';
import { Post } from '../types';

export const fetchPostsByUser = async (): Promise<Post[]> => {
    try {
        const postsResponse = await api.get('/posts');
        return postsResponse.data;
    } catch (error) {
        console.error('Error fetching posts by user:', error);
        throw new Error('Unable to fetch posts');
    }
};
