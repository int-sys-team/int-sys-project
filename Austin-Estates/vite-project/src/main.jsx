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
import { UserProvider } from './context/UserProvider';
import PropertyWishlist from './HouseDashboard/PropertyWishlist';
import MyProperties from './HouseDashboard/MyProperties';
import Profile from './HouseDashboard/Profile';
import SellerList from './Sellers/SellerList';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ComparisonProvider>
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<SignInSide />} />
					<Route path="/aboutus" element={<AboutUsPage />} />

					<Route
						path="/explore"
						element={<Paperbase Page={RentalDashboard} />}
					/>
					<Route
						path="/myFavorites"
						element={<Paperbase Page={PropertyWishlist} />}
					/>
					<Route
						path="/myProperties"
						element={<Paperbase Page={MyProperties} />}
					/>
					<Route
						path="/profile/:id"
						element={<Paperbase Page={Profile} />}
					/>
					<Route
						path="/explore/blog/:id"
						element={<Paperbase Page={Blog} />}
					/>
					<Route
						path="/newPost"
						element={<Paperbase Page={Checkout} />}
					/>
					<Route
						path="/sellers"
						element={<Paperbase Page={SellerList} />}
					/>
					<Route path="/" element={<App />} />
				</Routes>
			</Router>
		</UserProvider>
	</ComparisonProvider>
);
