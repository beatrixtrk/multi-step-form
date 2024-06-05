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
            'lightPurple': "#928CFF",
            'lightGray': "#F8F9FF",
            'gray': "#9699AA",
            'lightBlue': "#ABBCFF",
            'orange': "#FFAF7E",
            'pink': "#F9818E",
            'red': "#EE374A",
            'skyBlue': "#BEE2FD",
            'blue': "#164A8A",
            'white': "#FFFFFF"
        },
        extend: {
            boxShadow: {
                'stepForm': '0px 25px 40px -20px rgba(0, 0, 0, 0.10);',
                'buttonBar': '0px 25px 40px -20px rgba(0, 0, 0, 0.10);',
            }
        }
    },
    plugins: [],
};
