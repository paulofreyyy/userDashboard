import api from './api';

export const fetchPostsByUser = async () => {
    try {
        const postsResponse = await api.get('/posts');
        return postsResponse.data;
    } catch (error) {
        console.error('Error fetching posts by user:', error);
        throw new Error('Unable to fetch posts');
    }
};
