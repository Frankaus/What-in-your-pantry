module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
         'clip': "url('http://images.clipartpanda.com/page-clip-art--page-clipart-2.png')",
        })},
    },
    variants: {
        extend: {},
    },
    plugins: [], 
};
