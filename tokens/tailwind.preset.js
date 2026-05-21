/** DSS Design System · Tailwind v3 / v4 preset
 *  Usage: import dssPreset from '@bbv/dss/tailwind.preset.js';
 *         export default { presets: [dssPreset], ... }
 */

export default {
  theme: {
    extend: {
      colors: {
        ink: {
          0:    'oklch(1.000 0 0)',
          50:   'oklch(0.985 0.003 60)',
          100:  'oklch(0.965 0.005 60)',
          200:  'oklch(0.925 0.007 60)',
          300:  'oklch(0.850 0.009 60)',
          400:  'oklch(0.700 0.011 60)',
          500:  'oklch(0.560 0.012 60)',
          600:  'oklch(0.420 0.013 60)',
          700:  'oklch(0.300 0.012 60)',
          800:  'oklch(0.200 0.010 60)',
          900:  'oklch(0.130 0.008 60)',
          1000: 'oklch(0.020 0.004 60)',
        },
        amber: {
          50:  'oklch(0.975 0.025 83)',
          100: 'oklch(0.940 0.060 83)',
          200: 'oklch(0.880 0.110 83)',
          300: 'oklch(0.830 0.145 83)',
          400: 'oklch(0.800 0.165 83)',
          500: 'oklch(0.760 0.165 83)',
          600: 'oklch(0.660 0.150 78)',
          700: 'oklch(0.540 0.130 73)',
          800: 'oklch(0.420 0.110 63)',
          900: 'oklch(0.290 0.080 58)',
        },
        sky: {
          50:  'oklch(0.975 0.018 244)',
          100: 'oklch(0.940 0.045 244)',
          200: 'oklch(0.880 0.080 244)',
          300: 'oklch(0.820 0.110 244)',
          400: 'oklch(0.760 0.125 244)',
          500: 'oklch(0.680 0.140 246)',
          600: 'oklch(0.560 0.140 249)',
          700: 'oklch(0.450 0.135 252)',
          800: 'oklch(0.345 0.120 256)',
          900: 'oklch(0.230 0.080 259)',
        },
        neutral: {
          0:    'oklch(1.000 0 0)',
          50:   'oklch(0.985 0.003 250)',
          100:  'oklch(0.965 0.005 250)',
          200:  'oklch(0.925 0.006 250)',
          300:  'oklch(0.860 0.008 250)',
          400:  'oklch(0.700 0.010 250)',
          500:  'oklch(0.520 0.011 250)',
          600:  'oklch(0.420 0.011 250)',
          700:  'oklch(0.320 0.010 250)',
          800:  'oklch(0.215 0.009 250)',
          900:  'oklch(0.145 0.008 250)',
          950:  'oklch(0.085 0.006 250)',
          1000: 'oklch(0.025 0.004 250)',
        },
        success: {
          DEFAULT: 'oklch(0.640 0.150 150)',
          text:    'oklch(0.400 0.130 150)',
          soft:    'oklch(0.960 0.040 150)',
        },
        warning: {
          DEFAULT: 'oklch(0.770 0.165 75)',
          text:    'oklch(0.420 0.120 60)',
          soft:    'oklch(0.970 0.055 80)',
        },
        error: {
          DEFAULT: 'oklch(0.580 0.220 27)',
          button:  'oklch(0.400 0.190 27)',
          text:    'oklch(0.420 0.180 27)',
          soft:    'oklch(0.955 0.045 27)',
        },
        info: {
          DEFAULT: 'oklch(0.620 0.140 245)',
          text:    'oklch(0.380 0.130 245)',
          soft:    'oklch(0.955 0.035 245)',
        },
        team: {
          heim: 'oklch(0.450 0.135 252)',
          gast: 'oklch(0.520 0.180 25)',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['Manrope', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['88px',  { lineHeight: '0.9',  letterSpacing: '-0.04em',  fontWeight: '800' }],
        'clock':   ['64px',  { lineHeight: '1',    letterSpacing: '-0.02em',  fontWeight: '700' }],
        'h1':      ['44px',  { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2':      ['28px',  { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h3':      ['20px',  { lineHeight: '1.25', letterSpacing: '-0.01em',  fontWeight: '600' }],
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        // Touch target tokens
        'touch-sm': '44px',
        'touch-md': '56px',
        'touch-lg': '64px',
      },
      borderRadius: {
        'sm':  '4px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '18px',
      },
      boxShadow: {
        'dss-sm': '0 1px 2px rgba(15,20,38,0.08)',
        'dss-md': '0 4px 12px rgba(15,20,38,0.08), 0 1px 3px rgba(15,20,38,0.04)',
        'dss-lg': '0 18px 48px rgba(15,20,38,0.16), 0 4px 12px rgba(15,20,38,0.08)',
        'dss-xl': '0 30px 80px -10px rgba(15,20,38,0.30), 0 12px 30px -8px rgba(15,20,38,0.18)',
      },
      screens: {
        'tablet':  '1024px',  // iPad landscape — Kampfgericht
        'desktop': '1280px',
      },
    },
  },
};
