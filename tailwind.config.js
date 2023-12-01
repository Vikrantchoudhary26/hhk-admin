

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {    
      red:"#DD2745",
      gray:"#787878",
      pink:"#DD5471",
      darkred:"#BD1818",
      white:"#ffffff",
      blue:"#6B00DB",
      grayblue:"#183A4A",
      green:"#00B517",
    },
    extend: {
      fontFamily:{
        'alegreya':['Alegreya'],
        'dmsans':['Dm Sans'],
        'noto':['Noto Serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
