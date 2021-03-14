import React from "react";
import { Container, Grid } from "@material-ui/core";

import ColorThief from "colorthief";
import { sortColors } from "@/utils/colorUtil";
import chon from "@/assets/images/chon.jpeg";

class SwatchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      paletteHalfFirst: [],
      paletteHalfSecond: [],
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

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div></div>

            <div className="album">
              <div className="album-overlay" />
              <img
                className="album-image"
                src={chon}
                alt="album cover"
                id="cover"
                onLoad={this.getPixels}
              />{" "}
              <div className="album-details fadeIn-bottom">
                <h3 className="album-title">GET SWATCH</h3>
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            {this.state.paletteHalfFirst.map((color) => {
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
            {this.state.paletteHalfSecond.map((color) => {
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
