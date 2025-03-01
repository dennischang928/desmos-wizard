/**
 * Replaces the current document with a Desmos calculator displaying the given Bézier expressions.
 * 'expressions' should be an array of LaTeX strings.
 * Also sets the math bounds with left and bottom at -600.
 */
export function displayDesmos(expressions) {
  const bezierJSON = JSON.stringify(expressions);
  // Delay to allow any debugging output to flush, adjust delay as needed.
  setTimeout(() => {
    document.open();
    document.write(`
      
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Desmos Graph</title>
        </head>
        <body>
          <div id="calculator" style="width: 100%; height: 100vh;"></div>
          <script>
            (function() {
              var script = document.createElement('script');
              script.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
              script.async = true;
              script.onload = function() {
                var calculator = Desmos.GraphingCalculator(document.getElementById("calculator"),{autoResize: false});
                // Set math bounds with left and bottom at -600. Adjust right and top as needed.

                  var pixelCoordinates = calculator.graphpaperBounds.pixelCoordinates;
                var mathCoordinates = calculator.graphpaperBounds.mathCoordinates;
                var pixelsPerUnitY = pixelCoordinates.height / mathCoordinates.height;
                var pixelsPerUnitX = pixelCoordinates.width / mathCoordinates.width;
                calculator.setMathBounds({ left:  -640 *(pixelsPerUnitY / pixelsPerUnitX) , right: 0, bottom:-480, top: 0 });                // calculator.resize();
                var exprs = ${bezierJSON};
                if (Array.isArray(exprs)) {
                  exprs.forEach(function(expr, index) {
                    calculator.setExpression({
                      id: "bezier" + index,
                      latex: expr
                    });
                  });
                }
              };
              document.body.appendChild(script);
            })();
          </script>
        </body>
      </html>
    `);
    document.close();
  }, 1000);
}
