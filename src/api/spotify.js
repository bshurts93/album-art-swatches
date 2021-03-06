import axios from "axios";
const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL,
} = process.env;

const baseUrl = "https://api.spotify.com/v1/";

// QUERIES
export const searchArtist = async (artist) => {
  setAuthHeader();
  const result = await axios.get(
    `${baseUrl}search?query=${encodeURIComponent(artist)}&type=artist`
  );
  if (result && result.data) return result.data;
};
export const searchAlbums = async (artistId) => {
  setAuthHeader();
  const result = await axios.get(`${baseUrl}artists/${artistId}/albums`);
  if (result && result.data) return result.data;
};
export const getAlbumTracks = async (albumId) => {
  setAuthHeader();
  const result = await axios.get(`${baseUrl}albums/${albumId}/tracks`);
  if (result && result.data) return result.data;
};

// AUTH METHODS
const login = async () => {
  window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
};
export const getParamValues = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};
export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem("params"));
    if (params) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log("Error setting auth", error);
  }
};

export { login };
