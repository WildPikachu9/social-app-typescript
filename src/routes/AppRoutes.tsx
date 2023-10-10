import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import { FC } from 'react';
import { User } from '../types/User';

interface AppNavProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AppRoutes: FC<AppNavProps> = ({ user, setUser }) => {
    return (
        <Routes>
            <Route path='/' element={<Home user={user} setUser={setUser} />} />
            <Route path='/login' element={<Login user={user} setUser={setUser} />} />
            <Route path='/signup' element={<SignUp user={user}/>} />
        </Routes>
    )
}
export default AppRoutes;