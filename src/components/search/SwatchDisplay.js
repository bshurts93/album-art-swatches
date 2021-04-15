import React from "react";
import { Button, Container, Grid, Grow } from "@material-ui/core";
import { jsPDF } from "jspdf";

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

  saveSwatch = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById("swatch-pdf-container"), {
      callback: function (doc) {
        doc.save("test.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  render() {
    return (
      <Container>
        <Button
          color="primary"
          onClick={() =>
            setTimeout(() => {
              this.getAlbumColors();
            }, 400)
          }
        >
          New Swatch
        </Button>
        <Button onClick={this.saveSwatch}>Save to PDF</Button>
        <Grid id="swatch-pdf-container" container spacing={3}>
          <Grid item xs={12}>
            <img
              className="album-image"
              style={{ display: "none" }}
              src={this.state.album.images[0].url}
              alt="album cover"
              id="cover"
              onLoad={() => this.setState({ imgLoaded: true })}
            />
            <h1 className="swatch-title">{this.state.album.name}</h1>
          </Grid>

          <Grid item xs={6}>
            {this.state.test1.map((color, i) => {
              return (
                <Grow in={this.state.palette} timeout={400 * i}>
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
                  timeout={400 * i + this.state.test2.length * 400}
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
