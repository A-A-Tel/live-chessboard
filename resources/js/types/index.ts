export type User = {
    id: number;
    username: string;
    avatar?: string;
}

export type Comment = {
    id: number;
    content: string;
    created_at: number;
    commenter: User;
}

export type Relation = {
    id: number;
    sender: number;
    status: 'pending'|'blocked'|'accepted';
}

export type OtherUser = User & {
    relation?: Relation
}
