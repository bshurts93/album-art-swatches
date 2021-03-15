import React from "react";
import { Container, Grid } from "@material-ui/core";

import ColorThief from "colorthief";
import { sortColors, createHueSwatch } from "@/utils/colorUtil";
import chon from "@/assets/images/chon.jpeg";

class SwatchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      paletteHalfFirst: [],
      paletteHalfSecond: [],
      primaryHueSwatch: [],
      secondaryHueSwatch: [],
      album: {},
      albumHovered: false,
    };
  }

  getPixels = async () => {
    const colorThief = new ColorThief();
    const img = document.querySelector("#cover");

    if (img) {
      const palette = await colorThief.getPalette(img, 20);
      const sortedPalette = sortColors(palette).map(
        (c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`
      );
      const half = Math.ceil(sortedPalette.length / 2);
      const first = sortedPalette.splice(0, half);
      const second = sortedPalette.splice(-half);
      await this.setState({
        paletteHalfFirst: first,
        paletteHalfSecond: second,
      });
    }
  };

  getAlbumColors = async () => {
    const colorThief = new ColorThief();
    const img = document.querySelector("#cover");

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
                src={chon}
                alt="album cover"
                id="cover"
                onLoad={this.getAlbumColors}
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
