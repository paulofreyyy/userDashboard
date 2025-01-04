export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface UserPostCount {
    userId: number;
    postCount: number;
}
