import http from './httpService'

const apiEndpoint = '/users/'
const jwt = localStorage.getItem('token') || ''

export async function getPortrait(_id) {
    return http.get(apiEndpoint + 'me', { headers: { 'x-auth-token': jwt } })

}

export function getAllUsers() {
    return http.get(apiEndpoint, { headers: { 'x-auth-token': jwt } })
}
//需要管理员权限


export function register(user) {
    return http.post(apiEndpoint, {
        userName: user.userName,
        sex: user.sex,
        email: user.email,
        password: user.password,
    })
}

export function update(user) {
    return http.put(
        apiEndpoint + user._id,
        {
            userName: user.userName,
            email: user.email,
            password: user.password,
            sex: user.sex,
            portrait: user.portrait
        },
        { headers: { 'x-auth-token': jwt } }
    )
}

export function Delete(userId) {
    return http.delete(apiEndpoint + userId, { headers: { 'x-auth-token': jwt } }
    )
}

const userService = {
    getPortrait,
    getAllUsers,
    register,
    update,
    Delete
}

export default userService