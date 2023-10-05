import './_Post.scss';
import PostScript from '../typescript/PostScript';
import { useState } from 'react';


const Post: React.FC<{ post: PostScript }> = ({ post }) => {

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