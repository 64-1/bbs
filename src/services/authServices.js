import http from './httpService'
import {jwtDecode} from 'jwt-decode'

const apiEndpoint = '/auth'
const tokenKey = 'token'

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password })
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        const { data } = await http.get('/users/me', { headers: { 'x-auth-token': jwt } })
        const user = jwtDecode(jwt)
        user.portrait = data.portrait
        return user
    }
    catch (ex) { return null }
}

export function getCurrentUserOffLine() {
    try {
        return jwtDecode(localStorage.getItem(tokenKey))
    }
    catch (ex) { return null }
}

export function getCurrentUserId() {
    try {
        return jwtDecode = localStorage.getItem(tokenKey)
    }
    catch (ex) { return null }
}

export function compareAuthorization(operationId, userId) {
    return operationId === userId ? true : false;
}
const authServices = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getCurrentUserOffLine,
    getCurrentUserId,
    compareAuthorization
}

export default authServices