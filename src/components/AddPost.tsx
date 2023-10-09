import './_AddPost.scss';
import axios from "axios";
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';

interface AddPostProps {
    getPrevPosts: () => void;
}

const AddPost: React.FC<AddPostProps> = ({ getPrevPosts }) => {

    const [postContent, setPostContent] = useState('');
    
    const addPost = (e: FormEvent<HTMLFormElement>): void => {
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setPostContent(e.target.value)}
                value={postContent}
            ></textarea>
            <button className='Btn'>Add</button>
        </form>
    )
};

export default AddPost;