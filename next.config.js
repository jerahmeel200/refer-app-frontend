/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/i,
      use: "html-loader",
    });

    // // Find the rule for the HTML files
    // const htmlRule = config.module.rules.find((rule) =>
    //   rule.test.test(".html")
    // );

    // // Replace the `raw-loader` with the `html-loader`
    // htmlRule.use[0].loader = "html-loader";

    // // Configure the `html-loader` to handle file paths correctly
    // htmlRule.use[0].options = {
    //   // Handle <img> tags with src attributes
    //   sources: {
    //     list: [
    //       {
    //         tag: "img",
    //         attribute: "src",
    //         type: "src",
    //         filter: (tag, attribute, attributes) => {
    //           // Check if the attribute value is already an absolute URL
    //           if (/^(https?:)?\/\//.test(attributes[attribute])) {
    //             return false;
    //           }

    //           // Check if the attribute value starts with a '/'
    //           if (/^\//.test(attributes[attribute])) {
    //             return true;
    //           }

    //           // Check if the attribute value is a relative path
    //           return true;
    //         },
    //         path: path.join(__dirname, "public/[path][name].[ext]"),
    //       },
    //     ],
    //   },
    // };

    return config;
  },
};

module.exports = nextConfig;
