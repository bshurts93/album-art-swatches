import React from "react";
import ArtistList from "@components/search/ArtistList";
import AlbumList from "@components/search/AlbumList";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { searchArtist, searchAlbums } from "@/api/spotify";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearchInput: "",
      artistSearchResults: [],
      selectedArtistAlbums: [],
      isArtistSelected: false,
    };
  }

  // EVENT HANDLERS
  handleChange = (e) => {
    this.setState({ artistSearchInput: e.target.value });
  };
  handleKeyUp = (e) => {
    if (e.keyCode === 13) this.searchArtist();
  };

  // API METHODS
  searchArtist = async () => {
    const results = await searchArtist(this.state.artistSearchInput);
    this.setState({
      artistSearchResults: results.artists.items,
      selectedArtistAlbums: [],
      isArtistSelected: false,
    });
    console.log(this.state.artistSearchResults);
  };
  getArtistAlbums = async (id) => {
    const results = await searchAlbums(id);
    this.setState({
      selectedArtistAlbums: results.items,
      isArtistSelected: true,
    });
    console.log(this.state.selectedArtistAlbums);
  };

  render() {
    let { isArtistSelected } = this.state;

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
          value={this.state.artistSearchInput}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search button"
                  onClick={this.state.searchArtist}
                >
                  {this.state.artistSearchInput ? <SearchOutlined /> : null}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {isArtistSelected ? (
          <AlbumList albums={this.state.selectedArtistAlbums} />
        ) : (
          <ArtistList
            artistSearchInput={this.state.artistSearchInput}
            artistSearchResults={this.state.artistSearchResults}
            searchArtist={this.searchArtist}
            getArtistAlbums={this.getArtistAlbums}
            handleChange={this.handleChange}
            handleKeyUp={this.handleKeyUp}
          />
        )}
      </Container>
    );
  }
}
export default SearchView;
