import axios from "axios";

// @ts-ignore
const tokenaccess = JSON.parse(localStorage.getItem('token'));
function appSources(url='') {
    return axios.create({
        baseURL: url,
        headers: {
            "Content-type": "application/json",
            "Authorization": tokenaccess.token
        }
    });
}

export { appSources as appSources }
