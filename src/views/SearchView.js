import React from "react";
import ArtistList from "@components/search/ArtistList";
import AlbumList from "@components/search/AlbumList";
import SwatchDisplay from "@components/search/SwatchDisplay";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { searchArtist, searchAlbums, getAlbumTracks } from "@/api/spotify";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearchInput: "",
      artistSearchResults: [],
      selectedArtistAlbums: [],
      selectedAlbum: {},
      currentDisplay: "Artist",
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
    this.setState({
      currentDisplay: "Artist",
      artistSearchResults: [],
      selectedArtistAlbums: [],
    });
    setTimeout(async () => {
      const results = await searchArtist(this.state.artistSearchInput);
      this.setState({
        artistSearchResults: results.artists.items,
      });
    }, 500);
  };
  getArtistAlbums = async (id) => {
    const results = await searchAlbums(id);

    this.setState({
      currentDisplay: "Album",
      selectedArtistAlbums: results.items,
    });
  };
  getAlbumSwatch = async (album) => {
    console.log(album);

    getAlbumTracks(album.id);
    await this.setState({
      currentDisplay: "Swatch",
      selectedAlbum: { ...album, name: album.name },
    });
  };

  render() {
    let { currentDisplay } = this.state;

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

        {currentDisplay === "Artist" && (
          <ArtistList
            artistSearchInput={this.state.artistSearchInput}
            artistSearchResults={this.state.artistSearchResults}
            searchArtist={this.searchArtist}
            getArtistAlbums={this.getArtistAlbums}
            handleChange={this.handleChange}
            handleKeyUp={this.handleKeyUp}
          />
        )}
        {currentDisplay === "Album" && (
          <AlbumList
            albums={this.state.selectedArtistAlbums}
            getAlbumSwatch={this.getAlbumSwatch}
          />
        )}
        {currentDisplay === "Swatch" && (
          <SwatchDisplay album={this.state.selectedAlbum} />
        )}
      </Container>
    );
  }
}
export default SearchView;
