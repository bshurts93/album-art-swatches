import axios from "axios";

const getArtist = async (artist) => {
  let searchResults;
  await axios
    .get(`https://musicbrainz.org/ws/2/artist/?query=${artist}`)
    .then((res) => {
      searchResults = res.data;
    });
  return searchResults;
};

export { getArtist };
