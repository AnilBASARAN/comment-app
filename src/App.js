import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Login from './components/Login/Login';
import UserInfo from './components/UserInfo';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <div className="App">

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
  );
}

export default App;
