module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#0054A3',
          '200': '#00128E',
          '300': '#091442',
          '400': '#005cb3'
        },
        secondary: {
          '100': '#FDB813',
          '200': '#fcb103',
          '300': '#FCBF0E'
        },
        warning: '#FF2326',
        info: '#F0F8FF',
        darkInfo: '#005299',
        danger: '#FF2326',
        successColor: '#16AB21',
        borderColor: '#979797',
        borderPrimary: '#00128E'
      },
      zIndex: {
        '1': 1,
        '2': 2,
        '4': 4,
        '5': 5,
        '100': 100,
        '200': 200,
        '300': 300,
        '2000': 2000,
        '9999': 9999,
        '1000000': 1000000
      },
      height: {
        '0.1': '1px',
        '71': '72vh'
      },
      width: {
        'sm': '47%',
        'md': '45%',
        'xl': '95%',
        '97': '651px',
        '98': '940px',
        '600': '651px'
      },
      minWidth: {
        '36': "9 rem",
        '24': '100px',
        '28': '150px',
        '97': '454px',
        '500': '500px'
      },
      maxWidth: {
        '90': '90%'
      },
      minHeight: {
        '12': '40px',
        '28': '100px',
        '14': '50px',
        '96': '301px'
      },
      maxHeight: {
        '46': '460px',
        '52': '200px',
        '80': '80%',
        '85': '85%',
        '90': '90%',
        '95': '95%'
      },
      flex: {
        '2': .5,
        '5': .2,
        '4': .4
      },
      inset: {
        '0.6': '3px'
      },
      margin: {
        'sm': '6%',
        'md': '10%'
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '7': '7px'
      }
    },
  },
  variants:{
    extend: {
      fontSize: ['focus', 'disabled'],
      padding: ['focus', 'disabled'],
      inset: ['focus', 'disabled'],
      backgroundColor: ['disabled'],
      display: ['first']
    }
  },
  plugins: [],
}