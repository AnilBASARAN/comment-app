import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Login from './components/Login/Login';
import UserInfo from './components/UserInfo';
import CreateUser from './components/CreateUser';
import { Button } from '@mui/material';




function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  // Toggle night mode
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);



  };
  return (
    <div className="App">
      <div className={isNightMode ? 'night-mode' : 'day-mode'}>
      <Button
      className='toggleButton'
       onClick={toggleNightMode}>
        {isNightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      </Button>
      <BrowserRouter>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route  path ="/" element={<Home/>}>  </Route>
        <Route  path="/users/:userId" element={<User/>}>  </Route>
        <Route  path="/login" element={<Login/>}>  </Route>
        <Route  path="/users/:userId/userInfo" element={<UserInfo/>}>  </Route>
        <Route  path="/createuser" element={<CreateUser/>}>  </Route>
      </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
