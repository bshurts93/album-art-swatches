import React from "react";
import { Container, Grid, Grow } from "@material-ui/core";

import ColorThief from "colorthief";
import { createHueSwatch, testSwatch, isColorDark } from "@/utils/colorUtil";
import { getAlbumTracks } from "@/api/spotify";

class SwatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: props.album,
      albumTracks: [],
      palette: [],
      paletteHalfFirst: [],
      paletteHalfSecond: [],
      primaryHueSwatch: [],
      secondaryHueSwatch: [],
      albumHovered: false,
      imgLoaded: false,
      test1: [],
      test2: [],
    };
  }

  componentDidMount = async () => {
    const result = await getAlbumTracks(this.props.album.id);
    this.setState({ albumTracks: result.items });
  };

  componentDidUpdate = () => {
    if (this.state.albumTracks.length) {
      const img = document.querySelector("#cover");
      img.setAttribute("crossOrigin", "");
      img.addEventListener("load", () => {
        this.getAlbumColors();
      });
    }
  };

  getAlbumColors = async () => {
    await this.setState({
      palette: [],
      paletteHalfFirst: [],
      paletteHalfSecond: [],
      test1: [],
      test2: [],
    });
    const img = await document.querySelector("#cover");
    const colorThief = await new ColorThief();

    if (img) {
      const palette = await colorThief.getPalette(img, 20);

      const filteredPalette = palette.filter((x) => !isColorDark(x));
      console.log(filteredPalette);

      const primaryColorOne =
        filteredPalette[Math.floor(Math.random() * filteredPalette.length)];
      const primaryColorTwo =
        filteredPalette[Math.floor(Math.random() * filteredPalette.length)];

      const trackNum = this.state.albumTracks.length;
      const test = testSwatch(primaryColorOne, primaryColorTwo, trackNum);

      await this.setState({
        primaryHueSwatch: createHueSwatch(primaryColorOne),
        secondaryHueSwatch: createHueSwatch(primaryColorTwo),
        test1: test.firstHalfSwatch,
        test2: test.secondHalfSwatch,
      });
    }
  };

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div className="album">
              <div className="album-overlay" onClick={this.getAlbumColors} />
              <img
                className="album-image"
                src={this.state.album.images[0].url}
                alt="album cover"
                id="cover"
                onLoad={() => this.setState({ imgLoaded: true })}
              />
              <div className="album-details fadeIn-bottom">
                <h3 className="album-title">GET SWATCH</h3>
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            {this.state.test1.map((color, i) => {
              return (
                <Grow in={this.state.palette} timeout={200 * i}>
                  <div
                    className="swatch-item"
                    style={{ background: color }}
                    key={i}
                  >
                    {this.state.albumTracks[i].name}
                  </div>
                </Grow>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            {this.state.test2.map((color, i) => {
              return (
                <Grow
                  in={this.state.palette}
                  timeout={200 * i + this.state.test2.length * 200}
                >
                  <div
                    className="swatch-item"
                    style={{ background: color }}
                    key={i}
                  >
                    {this.state.albumTracks[i + this.state.test1.length].name}
                  </div>
                </Grow>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default SwatchView;
