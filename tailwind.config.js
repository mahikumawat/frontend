const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

// tailwind.config.js
module.exports = {
  content: [// <- this ensures all your component files are scanned
  "./src/**/*.{js,jsx,ts,tsx}", // <- if you're using static HTML
  "./public/index.html", ".flowbite-react/class-list.json"],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
};