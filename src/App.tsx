import './App.scss';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import { useState, useEffect } from 'react';
import { User } from './types/User';
import axios from 'axios';


function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    }
  }, []);

  axios.defaults.headers.common['Authorization'] = 'Bearer' + (user ? user.jwt_token : ' ');

  return (
    <div className="App">
      <AppNav user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
