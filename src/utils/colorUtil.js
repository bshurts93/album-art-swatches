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
