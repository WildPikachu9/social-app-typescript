import { Like } from './Like';
import { User } from './User';

export interface PostItem {
    content: string;
    created_at: string;
    id: number;
    likes: Like[];
    updated_at: string;
    user: User;
};

