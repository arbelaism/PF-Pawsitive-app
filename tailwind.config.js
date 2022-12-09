/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            'sm': {'min': '0px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
        },
        fontFamily: {
            sans: ['Assistant', 'sans-serif'],
            Rubik: ['Rubik', 'sans-serif']
        },
        extend: {
            colors: {
                pwgreen: {
                    50: '#ecf8f1',
                    100: '#c7ead6',
                    200: '#a2dcbb',
                    300: '#7dcf9f',
                    400: '#58c184',
                    500: '#3ea76a',
                    600: '#308253',
                    700: '#235d3b',
                    800: '#153823',
                    900: '#07130c'
                },
                pwpurple: {
                    50: '#f8ecf3',
                    100: '#eac7dc',
                    200: '#dca2c4',
                    300: '#cf7dac',
                    400: '#c15895',
                    500: '#a73e7b',
                    600: '#823060',
                    700: '#5d2344',
                    800: '#381529',
                    900: '#13070e'
                }
            }
        }
    },
    plugins: []
}
