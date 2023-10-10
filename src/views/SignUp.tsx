import './_SignUp.scss';
import { FC, ChangeEvent, FormEvent, useState } from 'react';
import { User } from '../types/User';
import { SignUpForm } from '../types/SignUpForm';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

interface SignUpProps {
    user: User | null;
}

const SignUp: FC<SignUpProps> = ({ user }) => {

    const [formData, setFormData] = useState<SignUpForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<SignUpForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [signUpMessage, setSignUpMessage] = useState('');
    const [signUpDone, setSignUpDone] = useState(false);

    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false,
        };

        if(formData.username.length < 4) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    username: 'User name should have at least 4 characters'
                };
            });
        } else if(!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    username: 'User name should`n have empty characters'
                };
            });
        } else {
            validationErrors.username = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    username: ''
                };
            });
        }

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    email: 'There is no valid email'
                };
            });
        } else {
            validationErrors.email = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    email: ''
                };
            });
        };

        if(formData.password.trim().length < 6){
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password should have at least 6 characters',
                };
            });
        } else if(!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password shouldn`t have empty characters',
                };
            });
        } else if(!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password must contain one of charts: ! # @ $ %',
                };
            });
        } else {
            validationErrors.password = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: '',
                };
            });
        };

        if(formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    confirmPassword: 'Password should be the same',
                };
            });
        } else {
            validationErrors.confirmPassword = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    confirmPassword: '',
                };
            });
        }

        return(
            !validationErrors.username && 
            !validationErrors.email && 
            !validationErrors.password &&
            !validationErrors.confirmPassword
        );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if(!validate()) {
            return
        };

        axios.post('https://akademia108.pl/api/social-app/user/signup', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
         })
         .then((res) => {
            console.log(res.data); 
            let resData = res.data;

            if(resData.signedup){
                setSignUpMessage('Account created!');
                setSignUpDone(true); 
            } else {
                if(resData.message.username) {
                    setSignUpMessage(resData.message.username[0]);
                } else if(resData.message.email){
                    setSignUpMessage(resData.message.email[0]);
                }
            }
         })
         .catch((error) => {
            console.error(error);
         });
    };

    return (
        <div className="SignUp">
            {user && <Navigate to='/' />}
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>} 
                <input 
                    type='text' 
                    name='username' 
                    placeholder='User name' 
                    onChange={handleInputChange}
                />
                {errors.username && <p>{errors.username}</p>}
                <input 
                    type='email' 
                    name='email' 
                    placeholder='User email' 
                    onChange={handleInputChange}
                />
                {errors.email && <p>{errors.email}</p>}
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    onChange={handleInputChange}
                />
                {errors.password && <p>{errors.password}</p>}
                <input 
                    type='password' 
                    name='confirmPassword' 
                    placeholder='Confirm Password' 
                    onChange={handleInputChange}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button className='Btn' disabled={signUpDone}>SignUp</button>

                {signUpDone && (
                    <div>
                        <Link to='/login' className='Btn'>Go to login</Link>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SignUp;