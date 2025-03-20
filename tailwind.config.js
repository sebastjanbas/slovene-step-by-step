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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        custom: {
          "button-l": "#e99f77",
          "button-d": "#e99f77",
          "button-hover-l": "#c3744a",
          "button-hover-d": "#c3744a",
          "accent-l": "#e99f77",
          "accent-d": "#e99f77",
          "light-1": "#2a2745",
          "light-2": "#464370",
          "light-3": "#040316",
          "light-4": "#040316",
          "dark-1": "#ffffff",
          "dark-2": "#a49fea",
          "dark-3": "#cfcfd2",
          "dark-4": "#cfcfd2",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "custom-gradient-linear":
          "linear-gradient(30deg, var(--tw-gradient-stops))",
        "custom-gradient-300deg":
          "linear-gradient(300deg, rgba(42,39,69,1) 0%, rgba(139,100,95,1) 71%, rgba(233,159,119,1) 100%)",
        "custom-gradient-120deg":
          "linear-gradient(120deg, rgba(70,67,112,1) 0%, rgba(158,117,116,1) 49%, rgba(233,159,119,1) 100%)",
        "custom-gradient-0deg":
          "linear-gradient(0deg, rgba(70,67,112,1) 0%, rgba(125,123,155,1) 60%, rgba(255,255,255,1) 100%)",
        "custom-gradient-radial":
          "linear-gradient(25deg, rgba(42,39,69,1) 0%, rgba(70,67,112,1) 43%, rgba(187,170,184,1) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        mantropeFont: ["Mantrope", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
