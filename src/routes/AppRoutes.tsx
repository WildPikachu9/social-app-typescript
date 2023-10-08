import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import { AppRoutesProps } from '../types/User';
import { FC } from 'react';

const AppRoutes: FC<AppRoutesProps> = ({ user, setUser }) => {
    return (
        <Routes>
            <Route path='/' element={<Home user={user} setUser={setUser} />} />
            <Route path='/login' element={<Login user={user} setUser={setUser} />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    )
}
export default AppRoutes;