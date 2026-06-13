export type User = {
    id: number;
    username: string;
    avatar?: string;
}

export type Comment = {
    content: string;
    created_at: number;
    commenter: User;
}
