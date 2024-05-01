/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            'backgroundBlue': "#EFF5FF",
            'borderColor': "#D6D9E6",
            'denim': "#022959",
            'purple': "#483EFF",
            'lightGray': "#F8F9FF",
            'gray': "#9699AA",
            'lightBlue': "#ABBCFF",
            'orange': "#FFAF7E",
            'pink': "#F9818E",
            'red': "#EE374A",
            'skyBlue': "#BEE2FD",
            'blue': "#164A8A",
            'white': "#FFFFFF"
        }
    },
    plugins: [],
};
