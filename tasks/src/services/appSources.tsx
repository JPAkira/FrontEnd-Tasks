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

function appSourcesWithoutLogin(url='') {
    return axios.create({
        baseURL: url,
        headers: {
            "Content-type": "application/json",
        }
    });
}

export { appSources as appSources }
export { appSourcesWithoutLogin as appSourcesWithoutLogin}
