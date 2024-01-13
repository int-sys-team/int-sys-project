import { API_URL, AI_API_URL } from '../utils/config';

export const getSimilarProperties = async (targetPropertyId: string) => {
	try {
		const response = await fetch(`${AI_API_URL}/similar`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: targetPropertyId }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.houses;
	} catch (error) {
		console.error('Error fetching similar properties:', error.message);
	}
};
export const getAllProperties = async () => {
	const response = await fetch(`${API_URL}/api/Property/GetAllProperties`);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getPropertyById = async (id: string) => {
	const response = await fetch(
		`${API_URL}/api/Property/GetPropertyById/${id}`
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getPropertiesOrderedByLatestSaleDate = async (
	page: number = 1,
	count: number = 100 /*HARDCODE*/
) => {
	const response = await fetch(
		`${API_URL}/api/Property/GetPropertiesOrderedByLatestSaleDate/${page}/${count}`
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getPropertiesOrderedByPrice = async (
	page: number = 1,
	count: number = 100 /*HARDCODE*/
) => {
	const response = await fetch(
		`${API_URL}/api/Property/getPropertiesOrderedByPrice/${page}/${count}`
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const filterProperties = async (
	zipcode: number | undefined | null,
	startYearBuilt: number = 1905,
	endYearBuilt: number = 2012,
	startPrice: number = 0,
	endPrice: number = 5000000
) => {
	let apiUrl = `${API_URL}/api/Property/FilterProperties`;

	const params = new URLSearchParams();
	if (zipcode) params.append('zipcode', String(zipcode));
	params.append('startYearBuilt', String(startYearBuilt));
	params.append('endYearBuilt', String(endYearBuilt));
	params.append('startPrice', String(startPrice));
	params.append('endPrice', String(endPrice));

	apiUrl += '?' + params.toString();

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getUserProperties = async (userToken:string) => {
	const response = await fetch(
		`${API_URL}/api/Property/GetAllUserProperties`,
		{
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const predictPropertyPrice = async (property: any) => {
	const response = await fetch(
		`${AI_API_URL}/price`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data: property}),
		}
	)

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	return data.price;
}
