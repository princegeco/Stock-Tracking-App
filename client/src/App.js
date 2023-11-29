import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';

 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
       <Route path='/' element={<Login />} />
       <Route path='/signup' element={<SignUp />} />
     </Routes>
     
   </div>
 );
};
 export default App;