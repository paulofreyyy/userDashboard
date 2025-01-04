import { useEffect, useState } from "react";
import { Comment, Post, User } from "../types";

export const useTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const postsData = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
        const commentsData = JSON.parse(localStorage.getItem('comments') || '[]') as Comment[];

        setUsers(usersData);
        setPosts(postsData);
        setComments(commentsData);
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, posts, comments, searchTerm]);

    const filterUsers = () => {
        const result = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredUsers(result);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const countPosts = (userId: number) => {
        return posts.filter(post => post.userId === userId).length;
    };

    const countComments = (userId: number) => {
        const postIds = posts.filter(post => post.userId === userId).map(post => post.id);
        return comments.filter(comment => postIds.includes(comment.postId)).length;
    };

    return {
        handleChangePage,
        handleChangeRowsPerPage,
        countPosts,
        countComments,
        filteredUsers,
        page,
        rowsPerPage,
        setSearchTerm
    }
}