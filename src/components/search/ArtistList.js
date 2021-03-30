import React from "react";
import { Grid, Zoom } from "@material-ui/core";
import { links } from "@/constants/links";

const ArtistList = (props) => {
  return (
    <div>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        {props.artistSearchResults.map((artist) => {
          return (
            <Zoom
              in={props.artistSearchResults}
              style={{
                transitionDelay: props.artistSearchResults ? "500ms" : "0ms",
              }}
            >
              <Grid item xs={4} style={{ textAlign: "center" }} key={artist.id}>
                <img
                  src={
                    artist.images[0]
                      ? artist.images[0].url
                      : links.genericAlbumCover
                  }
                  alt={artist.name}
                  className="artist-image"
                  onClick={() => props.getArtistAlbums(artist.id)}
                />
                <h3>{artist.name}</h3>
              </Grid>
            </Zoom>
          );
        })}
      </Grid>
    </div>
  );
};
export default ArtistList;
