import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Paperbase from './Paperbase';
import SignInSide from './SignInSide';
import SignUp from './SignUp';
import AboutUsPage from './AboutUsPage';
import App from './Intro/App';
import Blog from './HouseDetails/Blog';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<Routes>
			<Route path="/overview/signup" element={<SignUp />} />
			<Route path="/overview/signin" element={<SignInSide />} />
			<Route path="/overview/aboutus" element={<AboutUsPage />} />
			<Route path="/overview/blog" element={<Blog />} />
			<Route path="/overview/" element={<Paperbase />} />
			<Route path="/" element={<App />} />
		</Routes>
	</Router>
);
