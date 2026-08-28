import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'mlb',
    themes: {
      mlb: {
        dark: false,
        colors: {
          background: '#F7F1E3',
          surface: '#FFFFFF',
          primary: '#8D0801',
          'primary-darken-1': '#6B0601',
          secondary: '#708D81',
          'secondary-darken-1': '#586F65',
          accent: '#BF0603',
          info: '#001427',
          success: '#708D81',
          warning: '#F4D58D',
          error: '#BF0603',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      rounded: 'lg',
      style: 'text-transform: none; letter-spacing: 0;',
      fontWeight: 600,
    },
    VCard: {
      rounded: 'xl',
    },
    VTextField: {
      variant: 'outlined',
      rounded: 'lg',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      rounded: 'lg',
      density: 'comfortable',
    },
    VChip: {
      rounded: 'lg',
    },
    VAlert: {
      rounded: 'lg',
    },
    VNavigationDrawer: {
      rounded: '0',
    },
  },
})
