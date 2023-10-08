
export interface User {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
    created_ad: string;
    updated_at: string | null;
    jwt_token: string;
}

export interface AppRoutesProps {
    user: User | null;
    setUser: (user: User | null) => void;
}