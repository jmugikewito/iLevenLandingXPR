const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultExt = ".njk";

const getFileName = filePath => {
  return path.basename(filePath, defaultExt);
};

module.exports = ({ IS_DEV }) => {
  const paths = glob.sync(`${__dirname}/src/*${defaultExt}`);

  return paths.map(template => {
    const filename = getFileName(template);

    return new HtmlWebpackPlugin({
      template: template,
      favicon: path.resolve(__dirname, "src/public/favicon.ico"),
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      },
      filename: `${filename}.html`,
      hash: true
    });
  });
};
