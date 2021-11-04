const withPWA = require("next-pwa");
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	reactStrictMode: true,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
});
