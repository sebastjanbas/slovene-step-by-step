/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
	"./src/**/*.{html,js}",
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			},
			  custom: {
				'button-l': "#FF6B6B",
				'button-d': "#4ECDC4",
				'button-hover-l': "#FF8787",
				'button-hover-d': "#45B7AF",
				'accent-l': "#FFE66D",
				'accent-d': "#FF6B6B",
				'light-1': '#FF6B6B',
				'light-2': '#4ECDC4',
				'light-3': '#456DFF',
				'light-4': '#FFE66D',
				'dark-1': '#2C3E50',
				'dark-2': '#E74C3C',
				'dark-3': '#3498DB',
				'dark-4': '#27AE60',
			  }
		},
		  backgroundImage: {
			'custom-gradient': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
			'custom-gradient-linear': 'linear-gradient(30deg, var(--tw-gradient-stops))'
		  },
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};
