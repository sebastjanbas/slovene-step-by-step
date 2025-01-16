/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
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
  				'button-l': '#e99f77',
  				'button-d': '#e99f77',
  				'button-hover-l': '#c3744a',
  				'button-hover-d': '#c3744a',
  				'accent-l': '#e99f77',
  				'accent-d': '#e99f77',
  				'light-1': '#2a2745',
  				'light-2': '#464370',
  				'light-3': '#040316',
  				'light-4': '#040316',
  				'dark-1': '#ffffff',
  				'dark-2': '#a49fea',
  				'dark-3': '#cfcfd2',
  				'dark-4': '#cfcfd2'
  			}
  		},
  		backgroundImage: {
  			'custom-gradient': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
  			'custom-gradient-linear': 'linear-gradient(30deg, var(--tw-gradient-stops))',
  			'custom-gradient-300deg': 'linear-gradient(300deg, rgba(42,39,69,1) 0%, rgba(139,100,95,1) 71%, rgba(233,159,119,1) 100%)',
  			'custom-gradient-120deg': 'linear-gradient(120deg, rgba(70,67,112,1) 0%, rgba(158,117,116,1) 49%, rgba(233,159,119,1) 100%)',
  			'custom-gradient-0deg': 'linear-gradient(0deg, rgba(70,67,112,1) 0%, rgba(125,123,155,1) 60%, rgba(255,255,255,1) 100%)',
  			'custom-gradient-radial': 'linear-gradient(25deg, rgba(42,39,69,1) 0%, rgba(70,67,112,1) 43%, rgba(187,170,184,1) 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"),
	function ({ addUtilities }) {
		addUtilities({
		  '.text-stroke': {
			'-webkit-text-stroke': '2px white', /* Change 1px to adjust thickness */
			'text-fill-color': 'transparent',
		  },
		});
	  },
  ],
};
