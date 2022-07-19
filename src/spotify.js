const client_id = "51f88b9ea1154a2aa68e455cdf71ccbb";
const redirect_uri = "https://jonathancklee1.github.io/music-player/";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = [
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
];

const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export default loginEndpoint;
