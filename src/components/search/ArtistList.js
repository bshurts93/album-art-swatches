import React from "react";
import { Grid, Zoom } from "@material-ui/core";
import { links } from "@/constants/links";

const ArtistList = (props) => {
  return (
    <div>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        {props.artistSearchResults.map((artist, i) => {
          return (
            <Zoom in={props.artistSearchResults} timeout={200 * i}>
              <Grid item xs={4} style={{ textAlign: "center" }} key={artist.id}>
                <div className="album">
                  <div
                    className="album-overlay"
                    onClick={() => props.getArtistAlbums(artist.id)}
                  />
                  <img
                    className="album-image"
                    src={
                      artist.images[0]
                        ? artist.images[0].url
                        : links.genericAlbumCover
                    }
                    alt={artist.name}
                  />
                  <div className="album-details fadeIn-bottom">
                    <h3 className="album-title">GET ARTIST</h3>
                  </div>
                </div>
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
