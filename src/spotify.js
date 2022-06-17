import axios from "axios";
const client_id = "51f88b9ea1154a2aa68e455cdf71ccbb";
const client_secret = "5622f7de484b4a399eaebd04e7b61ac2";
const redirect_uri = "http://localhost:3000";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = ["user-library-read", "playlist-read-private"];

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const setClientToken = (token) => {
  api.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};
export default api;
