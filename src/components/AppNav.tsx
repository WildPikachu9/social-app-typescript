import { Link } from "react-router-dom";
import './_AppNav.scss';
import { AppRoutesProps } from '../types/User';
import { FC } from 'react';

const AppNav: FC<AppRoutesProps> = ({ user }) => {
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
            </ul>
        </nav>
    )
}

export default AppNav;