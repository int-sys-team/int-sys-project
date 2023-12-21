import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Paperbase from './Paperbase'
import SignInSide from './SignInSide'
import SignUp from './SignUp'
import AboutUsPage from './AboutUsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
         <Route path="/signup" element={<SignUp/>} />
         <Route path="/signin" element={<SignInSide />} />
         <Route path="/aboutus" element={<AboutUsPage />} />
         <Route path="/" element={<Paperbase/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
)