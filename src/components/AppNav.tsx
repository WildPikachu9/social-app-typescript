import { Link } from "react-router-dom";
import './_AppNav.scss';

const AppNav = () => {
    return (
        <nav className="AppNav">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>SignUp</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav;