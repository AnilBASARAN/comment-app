import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home/Home';
import User from './components/User/User';
import Login from './components/Login/Login';
import UserInfo from './components/UserInfo';
import CreateUser from './components/CreateUser';
import Joke from './Joke';



function App() {
  const joke = useState(null);
  return (
    <div className="App">

      <BrowserRouter>
      <Joke.Provider value={joke}>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route  path ="/" element={<Home/>}>  </Route>
        <Route  path="/users/:userId" element={<User/>}>  </Route>
        <Route  path="/login" element={<Login/>}>  </Route>
        <Route  path="/users/:userId/userInfo" element={<UserInfo/>}>  </Route>
        <Route  path="/createuser" element={<CreateUser/>}>  </Route>
      </Routes>
      </Joke.Provider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
