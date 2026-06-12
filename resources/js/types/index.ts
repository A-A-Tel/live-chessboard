export type User = {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

export type Comment = {
    content: string;
    userUsername: number;
    userAvatar: string;
}
