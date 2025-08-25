/**
 * Tils.js plugin
 */
import "tilt.js/dest/tilt.jquery.js";

if ($(".tilt").length) {
  $(".tilt").tilt({
    glare: true,
    maxGlare: 0.4
  });
}
