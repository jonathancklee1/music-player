const client_id = "51f88b9ea1154a2aa68e455cdf71ccbb";
const redirect_uri = "http://localhost:3000";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = [
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export default loginEndpoint;
