interface PostScript {
    content: string;
    created_at: string;
    id: number;
    likes: Likes[];
    updated_at: string;
    user: User;
};

interface Likes {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
    created_ad: string;
    pivot: any;
}

interface User {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
    created_ad: string;
    updated_at: string | null;
}

export default PostScript;