import './_Post.scss';
import { PostItem } from '../types/PostItem';
import { useState } from 'react';

interface Post {
    post: PostItem;
}

const Post: React.FC<Post> = ({ post }) => {

    const [likesCount, setLikesCount] = useState(post.likes.length);

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
                    {likesCount}
                </div>
            </div>
        </div>
    );
}; 

export default Post;