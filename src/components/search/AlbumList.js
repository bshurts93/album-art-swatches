import React from "react";
import { Grid } from "@material-ui/core";

const AlbumList = (props) => {
  console.log(props);

  return (
    <div>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        {props.albums.map((album) => {
          return (
            <Grid item xs={4} style={{ textAlign: "center" }} key={album.id}>
              <img
                src={
                  album.images[0]
                    ? album.images[0].url
                    : "https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg"
                }
                alt={album.name}
                className="artist-image"
              />
              <h3>{album.name}</h3>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default AlbumList;
