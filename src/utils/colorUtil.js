export const sortColors = (colors) => {
  for (let c = 0; c < colors.length; c++) {
    /* Get the RGB values to calculate the Hue. */
    const r = colors[c][0];
    const g = colors[c][1];
    const b = colors[c][2];

    /* Getting the Max and Min values for Chroma. */
    const max = Math.max.apply(Math, [r, g, b]);
    const min = Math.min.apply(Math, [r, g, b]);

    /* Variables for HSV value of hex color. */
    const chr = max - min;
    let hue = 0;
    const val = max;
    let sat = 0;

    if (val > 0) {
      /* Calculate Saturation only if Value isn't 0. */
      sat = chr / val;
      if (sat > 0) {
        if (r === max) {
          hue = 60 * ((g - min - (b - min)) / chr);
          if (hue < 0) {
            hue += 360;
          }
        } else if (g === max) {
          hue = 120 + 60 * ((b - min - (r - min)) / chr);
        } else if (b === max) {
          hue = 240 + 60 * ((r - min - (g - min)) / chr);
        }
      }
    }

    /* Modifies existing objects by adding HSV values. */
    colors[c].hue = hue;
    colors[c].sat = sat;
    colors[c].val = val;
  }

  /* Sort by Hue. */
  return colors.sort((a, b) => {
    return a.hue - b.hue;
  });
};

export const changeHexShade = (rgbArr, percent) => {
  var R = rgbArr[0];
  var G = rgbArr[1];
  var B = rgbArr[2];

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const createHueSwatch = (color) => {
  let percentages = [-40, -20, 0, 20, 40];
  let swatch = [];
  percentages.forEach((percentage) => {
    swatch.push(changeHexShade(color, percentage));
  });

  return swatch.reverse();
};
