import React from "react";
import { Grid, Zoom } from "@material-ui/core";

const AlbumList = (props) => {
  return (
    <div>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        {props.albums.map((album, i) => {
          return (
            <Zoom
              in={props.albums}
              timeout={800}
              style={{ transitionDelay: i * 100 }}
              key={album.id}
            >
              <Grid item xs={4} style={{ textAlign: "center" }} key={album.id}>
                <div className="album">
                  <div
                    className="album-overlay"
                    onClick={() => props.getAlbumSwatch(album)}
                  />
                  <img
                    className="album-image"
                    src={
                      album.images[0]
                        ? album.images[0].url
                        : "https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg"
                    }
                    alt={album.name}
                  />
                  <div className="album-details fadeIn-bottom">
                    <h3 className="album-title">GET ALBUM SWATCH</h3>
                  </div>
                </div>

                <h3>{album.name}</h3>
              </Grid>
            </Zoom>
          );
        })}
      </Grid>
    </div>
  );
};
export default AlbumList;
