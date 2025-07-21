import animate from 'tw-animate-css'

const config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  plugins: [animate],
  safelist: [
    {
      pattern: /data-\[state=(open|closed)\]:.*/,
    },
  ],
}

export default config
