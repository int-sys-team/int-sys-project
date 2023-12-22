export class StreamHandler {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}

	async invoke(requestBody, callback) {
		const response = await fetch(this.apiUrl, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const reader = response.body.getReader();

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				// The stream has ended
				break;
			}

			// Parse and handle the JSON object
			const data = new TextDecoder().decode(value);
			callback(data);
		}

		// Close the reader when done
		reader.releaseLock();
	}
}

// Example usage:
// const apiUrl = 'your_api_url';
// const streamHandler = new StreamHandler(apiUrl);

// const requestBody = {
// 	/* your request body */
// };
// const callback = (object) => {
// 	// Handle each object as it arrives
// 	console.log('Received object:', object);
// };

// streamHandler.invoke(requestBody, callback);
