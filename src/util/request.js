import axios from "axios";
import Vue from 'vue'
const request = axios.create({
	timeout: null,
	baseURL: process.env.NODE_ENV==="development"?'/api':"http://47.102.96.181:8866",
	// baseURL: process.env.NODE_ENV==="development"?'/api':"http://rrpxfp.natappfree.cc",
	// baseURL:'/api',
	// baseURL: baseUrl,
	headers:{
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'meta': 'isME'
	}
})
request.interceptors.request.use(
	(resp) => {
		return resp;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);
request.interceptors.response.use(
	(resp) => {
		return resp;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);
export default request;
