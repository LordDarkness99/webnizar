/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					"SF Pro Display",
					"SF Pro Text",
					"Inter",
					"system-ui",
					"sans-serif"
				],
			},
			colors: {
				mac: {
					blue: "#0071E3",
					blueHover: "#0077ED",
					darkBlue: "#0A84FF",
					red: "#FF5F57",
					yellow: "#FEBC2E",
					green: "#28C840",
				}
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '16px',
				xl: '24px',
				'2xl': '40px',
				'3xl': '64px',
			},
			boxShadow: {
				'mac-window': '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
				'mac-window-light': '0 25px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
				'mac-dock': '0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
				'mac-dock-light': '0 10px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7) inset',
			}
		},
	},
	plugins: [],
}
