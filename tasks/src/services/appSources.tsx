import axios from "axios";

// @ts-ignore
const tokenaccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3MTg3NjcxLCJpYXQiOjE2NzcwNTgwNzEsImp0aSI6IjdlYzk5OTA4NzE5ZjQyM2NiMzc3M2QyYWU2ZTdkZGVjIiwidXNlcl9pZCI6NH0.-i1qUL3UTvrvBVSe9OMiPnzZxV7QXgEoFfS-0Exr1CQ";
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
