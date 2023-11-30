import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import More from  './components/More';

 const App = () => {
 return (
   <div>
     <Routes>
       {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
       <Route path='/' element={<Login />} />
       <Route path='/signup' element={<SignUp />} />
       <Route path='/about' element={<About />} />
       <Route path='/more' element={<More />} />
     </Routes>
     
   </div>
 );
};
 export default App;