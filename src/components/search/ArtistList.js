import React from "react";
import { Grid } from "@material-ui/core";

const ArtistList = (props) => {
  return (
    <div>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        {props.artistSearchResults.map((artist) => {
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
                onClick={() => props.getArtistAlbums(artist.id)}
              />
              <h3>{artist.name}</h3>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default ArtistList;
