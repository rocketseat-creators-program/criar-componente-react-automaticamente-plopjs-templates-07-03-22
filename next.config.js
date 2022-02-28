// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	reactStrictMode: true,
	pwa: {
		runtimeCaching,
		dest: 'public',
		register: true,
		skipWaiting: true,
		buildExcludes: [/middleware-manifest.json$/],
		disable: process.env.NODE_ENV === 'development',
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
});
