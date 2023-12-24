import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Paperbase from './Paperbase';
import SignInSide from './SignInSide';
import SignUp from './SignUp';
import AboutUsPage from './AboutUsPage';
import App from './Intro/App';
import Blog from './HouseDetails/Blog';
import { ComparisonProvider } from './context/ComparisonProvider';

import 'leaflet/dist/leaflet.css';
import RentalDashboard from './HouseDashboard/RentalDashboard';
import Checkout from './HouseSelling/Checkout';


ReactDOM.createRoot(document.getElementById('root')).render(
	<ComparisonProvider>
		<Router>
			<Routes>
				<Route path="/overview/signup" element={<SignUp />} />
				<Route path="/overview/signin" element={<SignInSide />} />
				<Route path="/overview/aboutus" element={<AboutUsPage />} />
				<Route path="/overview/blog" element={<Blog />} />
				<Route
					path="/explore"
					element={<Paperbase Page={RentalDashboard} />}
				/>
				<Route
					path="/newPost"
					element={<Paperbase Page={Checkout} />}
				/>
				<Route path="/" element={<App />} />
			</Routes>
		</Router>
	</ComparisonProvider>
);
