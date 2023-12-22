import React, { createContext } from 'react';

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
	const [properties, setProperties] = React.useState([]);

	const compareProperties = (property) => {
		if (properties.map((p) => p._id).includes(property._id)) {
			setProperties(properties.filter((p) => p._id !== property._id));
			return;
		}
		if (properties.length === 2) return;
		console.log(property);
		setProperties([...properties, property]);
	};

	const getCount = () => {
		return properties.length;
	};

	return (
		<ComparisonContext.Provider
			value={{ properties, compareProperties, getCount }}
		>
			{children}
		</ComparisonContext.Provider>
	);
};
