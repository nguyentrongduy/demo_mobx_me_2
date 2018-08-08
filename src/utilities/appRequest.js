import axios from 'axios';

// axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.headers.common['Authorization'] = 'TOKEN';
axios.defaults.headers.post['responseType'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const AppRequest = {
	get: function (url, callback) {
		axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'text/xml'}}).then(callback)
	},
	post: function (url, oprion, callback) {
		axios.post(url, {...oprion, headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}}).then(callback)
	}
};