import { Link } from "react-router-dom";
import './_AppNav.scss';
import { AppRoutesProps } from '../types/User';
import { FC } from 'react';
import axios from "axios";

const AppNav: FC<AppRoutesProps> = ({ user, setUser }) => {

    const handleLogout = (e: any): void => {
        e.preventDefault();

        axios
        .post('https://akademia108.pl/api/social-app/user/logout')
        .then((res) => {
            console.log(res.data);
            
            if(res.data.message) {
                setUser(null);
                localStorage.setItem('user', JSON.stringify(res.data));
            };
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <nav className="AppNav">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                {!user && <li>
                    <Link to='/login'>Login</Link>
                </li>}
                {!user && <li>
                    <Link to='/signup'>SignUp</Link>
                </li>}
                {user && <li>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                </li>}
            </ul>
        </nav>
    )
}

export default AppNav;