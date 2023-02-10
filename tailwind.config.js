/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			columns: {
				'4xs': '14rem',
			},
		},
	},
	plugins: [],
}
