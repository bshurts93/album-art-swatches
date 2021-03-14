import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { searchArtist } from "@/api/spotify";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearch: "",
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
    console.log(results);
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
export default SearchView;
