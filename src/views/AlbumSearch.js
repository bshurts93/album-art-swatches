import React from "react";
import { Button, TextField } from "@material-ui/core";

import { getArtist } from "@/api/musicbrainz";

class AlbumSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearch: "",
    };
  }

  handleChange = (e) => {
    this.setState({ artistSearch: e.target.value });
  };

  searchArtist = async () => {
    const artists = await getArtist(this.state.artist);
    console.log(artists);
  };

  render() {
    return (
      <div>
        <TextField
          id="standard-basic"
          label="Standard"
          value={this.state.artistSearch}
          onChange={this.handleChange}
        />
        <Button variant="contained" color="primary" onClick={this.searchArtist}>
          Search Artists
        </Button>
      </div>
    );
  }
}
export default AlbumSearch;
