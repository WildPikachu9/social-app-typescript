import { useEffect, useState } from 'react';
import './_Home.scss';
import axios from 'axios';
import Post from '../components/Post';
import { PostItem } from '../types/PostItem';
import { AppRoutesProps } from '../types/User';
import { FC } from 'react';

const Home: FC<AppRoutesProps> = ({ user }) => {

    const [posts, setPosts] = useState<PostItem[]>([]);

    const getLatestPosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest')
        .then((res) => {
            
            setPosts(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const getNextPosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/older-then', {
            date: posts[posts.length - 1].created_at
        })
        .then((req) => {
            setPosts((prevPosts) => [...prevPosts, ...req.data]);
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
            <div className='PostList'>
                {posts.map((post: PostItem, id: number) => {
                    return <Post post={post} key={id}/>
                })}
                <button className='Btn' onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    )
}

export default Home;