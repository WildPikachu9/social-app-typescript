import './_AddPost.scss';
import axios from "axios";
import { useState } from 'react';

const AddPost = ({ getPrevPosts }: any) => {

    const [postContent, setPostContent] = useState('');
    
    const addPost = (e: any) => {
        e.preventDefault();
        if(!postContent) {
            return;
        };

        axios
            .post('https://akademia108.pl/api/social-app/post/add', {
                content: postContent,
            })
            .then(() => {
                getPrevPosts();
                setPostContent(''); 
            }) 
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form 
            className='AddPostForm'
            onSubmit={addPost}
        >
            <textarea 
                placeholder='Add post...' 
                onChange={(e:any): void => setPostContent(e.target.value)}
                value={postContent}
            ></textarea>
            <button className='Btn'>Add</button>
        </form>
    )
};

export default AddPost;