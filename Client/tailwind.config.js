// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        borderColor: {
          // 'border' is the key you want to reference with the class 'border-border'
          border: "var(--border)",
        },
      },
    },
    plugins: [],
  };
  