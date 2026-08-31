/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],   // 13px
        sm: ['0.9375rem', { lineHeight: '1.45rem' }],   // 15px
        base: ['1.03125rem', { lineHeight: '1.75rem' }], // 16.5px
        lg: ['1.1875rem', { lineHeight: '1.75rem' }],   // 19px
        xl: ['1.375rem', { lineHeight: '1.875rem' }],   // 22px
        '2xl': ['1.625rem', { lineHeight: '2.125rem' }],// 26px
        '3xl': ['2rem', { lineHeight: '2.5rem' }],       // 32px
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: theme('colors.neutral.700'),
            fontSize: '1.03125rem',
            lineHeight: '1.8',
            a: {
              color: theme('colors.neutral.900'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: theme('colors.neutral.400'),
              fontWeight: '400',
              '&:hover': {
                textDecorationColor: theme('colors.neutral.900'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.neutral.900'),
              fontWeight: '500',
              letterSpacing: '-0.02em',
            },
            h1: {
              fontSize: '1.875rem',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.375rem',
              marginTop: '2.25rem',
              marginBottom: '0.875rem',
            },
            h3: {
              fontSize: '1.1875rem',
              marginTop: '1.75rem',
              marginBottom: '0.625rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            code: {
              color: theme('colors.neutral.800'),
              backgroundColor: theme('colors.neutral.100'),
              padding: '0.15rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.875rem',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            hr: {
              borderColor: theme('colors.neutral.200'),
              marginTop: '2.25rem',
              marginBottom: '2.25rem',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.neutral.300'),
            a: {
              color: theme('colors.neutral.100'),
              textDecorationColor: theme('colors.neutral.600'),
              '&:hover': {
                textDecorationColor: theme('colors.neutral.200'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.neutral.100'),
            },
            code: {
              color: theme('colors.neutral.200'),
              backgroundColor: theme('colors.neutral.800'),
            },
            hr: {
              borderColor: theme('colors.neutral.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
