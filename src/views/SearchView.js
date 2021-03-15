import React from "react";
import {
  Card,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { searchArtist } from "@/api/spotify";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearch: "",
      searchResults: [],
    };
  }

  handleChange = (e) => {
    this.setState({ artistSearch: e.target.value });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) this.searchArtist();
  };

  searchArtist = async () => {
    const results = await searchArtist(this.state.artistSearch);
    this.setState({ searchResults: results.artists.items });
    console.log(this.state.searchResults);
  };

  render() {
    return (
      <Container>
        <TextField
          id="artist-search"
          label="Artist Search"
          style={{ margin: 8 }}
          placeholder="Search"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.artistSearch}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search button"
                  onClick={this.searchArtist}
                >
                  {this.state.artistSearch ? <SearchOutlined /> : null}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3} style={{ textAlign: "center" }}>
          {this.state.searchResults.map((artist) => {
            return (
              <Grid item xs={4} style={{ textAlign: "center" }} key={artist.id}>
                <img
                  src={
                    artist.images[0]
                      ? artist.images[0].url
                      : "https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg"
                  }
                  alt={artist.name}
                  className="artist-image"
                />
                <h3>{artist.name}</h3>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}
export default SearchView;
