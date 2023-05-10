import React from 'react';
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Lobby from './components/Lobby';
import Room from './components/Room';
import CreateRoom from './components/CreateRoom';
import Home from './components/Home';
import Protected from './components/Protected';




function App() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">register</Link></li>
        <li><Link to="/lobby">Lobby</Link></li>
       
      </ul>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/lobby" element={<Protected> <Lobby/></Protected>} />
        <Route path="/lobby/:id" element={<Room/>} />
        <Route path="/createroom" element={<CreateRoom/>} />





      </Routes>

      </div>
  );
}

export default App;