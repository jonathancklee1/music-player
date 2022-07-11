export const initialState = {
  user: null,
  playlists: [],
  genres: [],
  selectedGenres: [],
  currentPlaylist: null,
  playing: false,
  isFav: false,
  currentSong: null,
  token: null,
  categories: [],
  trackNumber: 0,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };
    case "SET_GENRES":
      return {
        ...state,
        genres: action.genres,
      };
    case "SET_SELECTED_GENRES":
      return {
        ...state,
        selectedGenres: action.selectedGenres,
      };
    case "SET_CURRENTSONG":
      return {
        ...state,
        currentSong: action.currentSong,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        currentPlaylist: action.currentPlaylist,
      };
    case "SET_ISFAV":
      return {
        ...state,
        isFav: action.isFav,
      };
    case "SET_TRACK_NUMBER":
      return {
        ...state,
        trackNumber: action.trackNumber,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
export default reducer;
