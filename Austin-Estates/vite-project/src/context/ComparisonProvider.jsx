import React, { createContext } from 'react';

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
	const [properties, setProperties] = React.useState([]);

	const compareProperties = (property) => {
		if (properties.length === 2) return;
		console.log(property);
		setProperties([...properties, property]);
	};

	const getCount = () => {
		return properties.length;
	};

	return (
		<ComparisonContext.Provider value={{ properties, compareProperties, getCount }}>
			{children}
		</ComparisonContext.Provider>
	);
};
