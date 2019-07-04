// Public variables for URL and KEYS from API (movies)
const API_URL = 'https://api.themoviedb.org/';
const API_MOVIE_KEY = 'eae43b8984cfe743cedc142733cc1cba';

// Url modifier to make request easier
class URLP extends URL {
	constructor(url, defaultParams, base) {
		super(url, base);
		this.init(defaultParams);
	}

	init(defaultParams) {
		this.search = new URLSearchParams(defaultParams);
	}

	defaultPath(path) {
		this.defaultPath = path;
	}

	setQuery(query) {
		const queryString = Object.entries(query);

		const previousQueryString = Array.from(this.searchParams.entries());

		this.search = new URLSearchParams([ ...queryString, ...previousQueryString ]);
	}

	setPath(path) {
		this.pathname = this.defaultPath + path;
	}
}

// Generate a client object <URL> for request
function createClient(baseUrl, baseParams) {
	if (!baseUrl || typeof baseUrl === 'object') throw new Error('baseUrl must be a string.');

	// Global instance on public API
	const url = new URLP(baseUrl, baseParams);

	// Set default path
	url.defaultPath('/3');

	// Simple fetch for Paths and Queries
	const fetchMovie = (path = '', query = {}) => {
		url.setPath(path);
		url.setQuery(query);
		return fetch(url).then((res) => res.json());
	};

	return {
		fetchMovie
	};
}

// Create an instance about api
export default createClient(API_URL, { api_key: API_MOVIE_KEY });
