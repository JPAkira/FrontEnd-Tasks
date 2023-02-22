import axios from "axios";

// @ts-ignore
const tokenaccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3MDQ5NjkzLCJpYXQiOjE2NzcwNDkzOTMsImp0aSI6Ijg2NjgxZmMwYmU3MzQ5Y2FiYjQ3YTUyNjNjYmU0MjkzIiwidXNlcl9pZCI6NH0.tmjwbKGefLTDupF76zBchnnfmG_kuCJ93Byo8CFXIkM";
function appSources(url='') {
    return axios.create({
        baseURL: url,
        headers: {
            "Content-type": "application/json",
            "Authorization": tokenaccess
        }
    });
}

export { appSources as appSources }
