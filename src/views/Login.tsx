import { useState } from 'react';
import { FC, FormEvent, ChangeEvent } from 'react';
import './_Login.scss';
import { LoginForm } from '../types/LoginForm';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { User } from '../types/User';

interface AppNavProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const Login: FC<AppNavProps>  = ({ user, setUser }) => {

    const [formData, setFormData] = useState<LoginForm>({
        username: '',
        password: '',
    });
    const [loginMessage, setLoginMessage] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value,
        })
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('https://akademia108.pl/api/social-app/user/login', {
            username: formData.username,
            password: formData.password
        })
        .then((res) => {

            if(Array.isArray(res.data.username)) {
                setLoginMessage(res.data.username[0]);
            } else if(Array.isArray(res.data.password)) {
                setLoginMessage(res.data.password[0]);
            } else if(res.data.error) {
                setLoginMessage('Inccorect username or password.')
            } else {
                setLoginMessage('');
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            };
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    return (
        <div className="Login">
            {user && <Navigate to='/' />}
            <form className='LoginForm' onSubmit={handleSubmit}>
                {loginMessage && <h2>{loginMessage}</h2>}
                <input 
                    type='text' 
                    name='username' 
                    placeholder='User Name' 
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input 
                    type='password' 
                    name='password' 
                    placeholder='User password' 
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button className='Btn'>Login</button>
            </form>
        </div>
    )
}

export default Login;