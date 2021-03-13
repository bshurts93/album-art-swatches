import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";

import ColorThief from "colorthief";
import chon from "@/assets/images/chon.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function SwatchView() {
  const classes = useStyles();
  const [palette, setPalette] = React.useState([]);

  const getPixels = async () => {
    console.log("LOADED");

    const colorThief = new ColorThief();
    const img = document.querySelector("#cover");

    if (img) {
      const palette = await colorThief
        .getPalette(img, 10)
        .map((arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`);
      console.log(palette);

      await setPalette(palette);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ background: chon }}>
            <img src={chon} alt="album cover" id="cover" onLoad={getPixels} />
          </Paper>
        </Grid>

        {palette.map((color) => {
          return (
            <Grid item xs={6} key={color}>
              <Paper className={classes.paper} style={{ background: color }}>
                xs=6
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
