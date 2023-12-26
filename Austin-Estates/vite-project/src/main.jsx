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
				<Route path="/explore/signup" element={<SignUp />} />
				<Route path="/explore/signin" element={<SignInSide />} />
				<Route path="/explore/aboutus" element={<AboutUsPage />} />
				
				<Route
					path="/explore"
					element={<Paperbase Page={RentalDashboard} />}
				/>
				<Route path="/explore/blog/:id" element={<Paperbase Page={Blog} />} />
				<Route
					path="/:id"
					element={<Paperbase Page={Checkout} />}
				/>
				<Route path="/" element={<App />} />
			</Routes>
		</Router>
	</ComparisonProvider>
);
