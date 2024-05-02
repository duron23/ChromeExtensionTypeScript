const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");

function getEntryPoints(globPath) {
  const files = glob.sync(globPath);
  const entries = {};
  files.forEach((file) => {
    const entryKey = file.replace("src/", "").replace(/\.ts$/, "");
    entries[entryKey] = "./" + file;
  });
  return entries;
}

module.exports = {
  mode: "production", // Ensure production mode
  entry: getEntryPoints("src/**/*.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      return pathData.chunk.name.replace(/\//g, "_") + ".js";
    }, // Adjust filename to mimic src structure in dist
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/**/*.html", to: "[path][name][ext]" },
        { from: "src/**/*.css", to: "[path][name][ext]" },
        { from: "src/**/*.json", to: "[path][name][ext]" },
        { from: "src/**/*.js", to: "[path][name][ext]" },
      ],
    }),
  ],
};
