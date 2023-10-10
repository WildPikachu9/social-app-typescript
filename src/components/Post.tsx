import './_Post.scss';
import { PostItem } from '../types/PostItem';
import { User } from '../types/User';
import { useState } from 'react';
import axios from 'axios';

interface PostProps {
    post: PostItem;
    user: User | null;
    setPosts: React.Dispatch<React.SetStateAction<PostItem[]>>;
    getLatestPosts:  () => void;
}

const Post: React.FC<PostProps> = ({ post, user, setPosts, getLatestPosts }) => {

    const [likesCount, setLikesCount] = useState(post.likes.length);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [doesUserLiked, setDoesUserLiked] = useState(post.likes.filter(like => like.username === user?.username).length !== 0);

    const deletePost = (id: number): void => {
        axios
        .post('https://akademia108.pl/api/social-app/post/delete', {
            post_id: id
        })
        .then((res) => {
            setPosts((posts) => {
                return posts.filter((post) => post.id !== res.data.post_id)
            })
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const likePost = (id: number, isLiked: boolean): void => {
        axios
        .post('https://akademia108.pl/api/social-app/post/' + (isLiked ? 'dislike' : 'like'), {
            post_id: id
        })
        .then(() => {
            setLikesCount(likesCount + (isLiked ? -1 : 1));
            setDoesUserLiked(!isLiked);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const unfollow = (id: number): void => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow', {
            leader_id: id
        })
        .then(() => {
            getLatestPosts();
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='Post'>
            <div className='Avatar'>
                <img src={post.user.avatar_url} alt={post.user.username} />
            </div>
            <div className="PostData">
                <div className="PostMeta">
                    <div className="Author">
                        {post.user.username}
                    </div>
                    <div className="Date">
                        {post.created_at.substring(0, 10)}
                    </div>
                </div>
                <div className="PostContent">
                    {post.content}
                </div>
                <div className="Likes">
                    {user?.username === post.user.username && (
                        <button 
                            className='Btn' 
                            onClick={() => setDeleteModalVisible(true)}
                        >
                            Delete
                        </button>
                    )}

                    {user && user.username !== post.user.username ? (
                        <button className='Btn' onClick={() => unfollow(post.user.id)}>Unfollow</button>
                    ) : null}

                    {user && (
                    <button 
                        className='Btn' 
                        onClick={() => likePost(post.id, doesUserLiked)}
                    >
                        {doesUserLiked ? 'Dislike' : 'Like'}
                    </button>
                    )}

                    {likesCount}
                </div>
            </div>
            {deleteModalVisible && (<div className='deleteConfirmation'>
                <h3>Are you sure want to delete post?</h3>
                <button className='Btn Yes' onClick={() => deletePost(post.id)}>Yes</button>
                <button className='Btn No' onClick={() => setDeleteModalVisible(false)}>No</button>
            </div>)}
        </div>
    );
}; 

export default Post;