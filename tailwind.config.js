/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./frontend/components/**/*.{ts,tsx}"
  ],
  plugins: [
    require("flowbite/plugin"),
    //require("/node_modules/flowbite/plugin.js")
  ],
  theme: {},
};