import React from "react";
import { Container, Grid } from "@material-ui/core";

import ColorThief from "colorthief";
import { createHueSwatch } from "@/utils/colorUtil";

class SwatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: props.album,
      palette: [],
      paletteHalfFirst: [],
      paletteHalfSecond: [],
      primaryHueSwatch: [],
      secondaryHueSwatch: [],
      albumHovered: false,
      imgLoaded: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log("UPDATED");
    const img = document.querySelector("#cover");
    console.log(img);

    img.setAttribute("crossOrigin", "");
    img.addEventListener("load", () => {
      this.getAlbumColors();
    });
  };

  getAlbumColors = async () => {
    const img = await document.querySelector("#cover");
    const colorThief = await new ColorThief();

    if (img) {
      const palette = await colorThief.getPalette(img, 20);
      const primaryColorOne = palette[Math.floor(Math.random() * 20)];
      const primaryColorTwo = palette[Math.floor(Math.random() * 20)];

      console.log(createHueSwatch(primaryColorOne));
      console.log(createHueSwatch(primaryColorTwo));

      await this.setState({
        primaryHueSwatch: createHueSwatch(primaryColorOne),
        secondaryHueSwatch: createHueSwatch(primaryColorTwo),
      });
    }
  };

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div onClick={this.getAlbumColors}>GET NEW</div>

            <div className="album">
              <div className="album-overlay" />
              <img
                className="album-image"
                src={this.state.album.images[0].url}
                alt="album cover"
                id="cover"
                style={{ width: "840px", height: "400px" }}
                onLoad={() => this.setState({ imgLoaded: true })}
              />
              <div className="album-details fadeIn-bottom">
                <h3 className="album-title">GET SWATCH</h3>
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            {this.state.primaryHueSwatch.map((color) => {
              return (
                <div
                  className="swatch-item"
                  style={{ background: color }}
                  key={color}
                >
                  xs=6
                </div>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            {this.state.secondaryHueSwatch.map((color) => {
              return (
                <div
                  className="swatch-item"
                  style={{ background: color }}
                  key={color}
                >
                  xs=6
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default SwatchView;
