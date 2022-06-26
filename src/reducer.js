export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  currentSong: null,
  token: null,
  categories: [],
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
    case "SET_CURRENTSONG":
      return {
        ...state,
        currentSong: action.currentSong,
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
