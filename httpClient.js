import axios from 'axios'
import jwtDecode from 'jwt-decode'
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_LINK  = process.env.VITE_API_LINK
const httpClient = axios.create()

// create an interceptor that will run before every request
httpClient.defaults.withCredentials = true

//get token from local storage
httpClient.getToken = function() {
	try {
		return AsyncStorage.getItem('token')
	} catch (error) {
		console.log(error)
		return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhY2VmMWVmYjE1ZDAwMDhiODAxZDAiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtYSI6IjEyMzQiLCJlbWFpbCI6IjQzMjEiLCJyb2xlIjoiNDMyMSIsIl9fdiI6MCwiaWF0IjoxNjcxMDg5OTA1fQ.DWhNu45JHd3HRQk1zFM762SrB92eJOAU2nbAcT6PDlA"
	}
}

//set token to local storage and return it
httpClient.setToken = async function (token) {
	// save to keychain
	try {
		await AsyncStorage.setItem('@storage_Key', token)
	} catch (e) {
		// saving error
	}
}


// get all users
httpClient.getAllUsers = function() {
	return this({ method: 'get', url: 'https://beppk.vercel.app/api/users' })
		.then((serverResponse) => {
			return serverResponse.data
		})
}

// delete user
httpClient.deleteUser = function(nama) {
	return this({ method: 'delete', url: 'https://beppk.vercel.app/api/users/' + nama })
		.then((serverResponse) => {
			return serverResponse.data
		})
}

//update user
httpClient.updateUser = function(nama, data) {
	console.log("masuk update")
	return this({ method: 'patch', url: 'https://beppk.vercel.app/api/users/' + nama, data: data })
		.then((serverResponse) => {
			return serverResponse.data
		})
}


httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: 'https://beppk.vercel.app/api/users/authenticate/',data: credentials
	}).then(async serverResponse => {
		const token = serverResponse.data.token
		// set the token in keychain
		await this.setToken(token).then(r => {
			console.log(AsyncStorage.getItem('token'))
		})
		return serverResponse.data
	})
}

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: 'https://beppk.vercel.app/api/users', data: userInfo})
		.then(async (serverResponse) => {
			const token = serverResponse.data.token
			// set the token in keychain
			await this.setToken(token).then(r => {
				console.log(AsyncStorage.getItem('token'))
			})
			return serverResponse.data
		})
}

httpClient.cariUser = function(username) {
	return this({ method: 'get', url: 'https://beppk.vercel.app/api/users/' + username })
		.then((serverResponse) => {
			return serverResponse.data
		})
}

// httpClient.logOut = function() {
// 	localStorage.removeItem('token')
// 	delete this.defaults.headers.common.token
// 	return true
// }

httpClient.createKonten = function(konten) {
	return this({ method: 'post', url: 'https://beppk.vercel.app/api/konten', data: konten})
		.then((serverResponse) => {
			return serverResponse.data
		})
}
httpClient.getAllKonten = function() {
	return this({ method: 'get', url: 'https://beppk.vercel.app/api/konten' })
		.then((serverResponse) => {
			return serverResponse.data
		})
}
httpClient.getKontenById = function(id) {
	return this({ method: 'get', url: 'https://beppk.vercel.app/api/konten/' + id })
		.then((serverResponse) => {
			return serverResponse.data
		})
}
httpClient.deleteKontenById = function(id) {
	return this({ method: 'delete', url: 'https://beppk.vercel.app/api/konten/' + id })
		.then((serverResponse) => {
			return serverResponse.data
		})
}
httpClient.updateKontenById = function(id, konten) {
	return this({ method: 'patch', url: 'https://beppk.vercel.app/api/konten/' + id, data: konten })
		.then((serverResponse) => {
			return serverResponse.data
		})
}
httpClient.cariEmail = function(email) {
	return this({ method: 'get', url: 'https://beppk.vercel.app/api/users/email/' + email })
		.then((serverResponse) => {
			return serverResponse.data
		})
}

// token is automatically sent with every request
// httpClient.defaults.headers.common.token = httpClient.getToken()

export default httpClient