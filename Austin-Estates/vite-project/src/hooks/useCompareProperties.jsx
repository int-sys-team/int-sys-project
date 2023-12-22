import { useContext } from 'react';
import { ComparisonContext } from '../context/ComparisonProvider';

export const useCompareProperties = () => {
	const { properties, compareProperties, getCount } = useContext(ComparisonContext);
	return { properties, compareProperties, getCount };
};
