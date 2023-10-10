import { useEffect, useState } from 'react';
import './_Home.scss';
import axios from 'axios';
import Post from '../components/Post';
import { PostItem } from '../types/PostItem';
import { FC } from 'react';
import AddPost from '../components/AddPost';
import { User } from '../types/User';
import FollowRecommendations from '../components/FollowRecommendations';

interface AppNavProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const Home: FC<AppNavProps> = ({ user }) => {

    const [posts, setPosts] = useState<PostItem[]>([]);

    const getLatestPosts = () => {
        axios
            .post('https://akademia108.pl/api/social-app/post/latest')
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getPrevPosts = () => {
        axios
            .post('https://akademia108.pl/api/social-app/post/newer-then', {
                date: posts[0].created_at
            })
            .then((res) => {
                setPosts((prevPosts) => [...res.data, ...prevPosts]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getNextPosts = () => {
        axios
            .post('https://akademia108.pl/api/social-app/post/older-then', {
                date: posts[posts.length - 1].created_at
            })
            .then((res) => {
                setPosts((prevPosts) => [...prevPosts, ...res.data]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getLatestPosts();
    }, [user]);
    
    return (
        <div className='Home'>
            {user && <AddPost getPrevPosts={getPrevPosts} />}
            {user && <FollowRecommendations user={user} getLatestPosts={getLatestPosts} posts={posts} />}
            <div className='PostList'>
                {posts.map((post: PostItem) => {
                    return <Post post={post} key={post.id} user={user} setPosts={setPosts} 
                    getLatestPosts={getLatestPosts}/>
                })}
                <button className='Btn' onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    )
}

export default Home;