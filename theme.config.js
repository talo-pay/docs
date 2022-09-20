import React from "react"
import TaloLogo from "./components/TaloLogo"
// theme.config.js
export default {
	projectLink: "https://github.com/talo-pay/docs", // GitHub link in the navbar
	docsRepositoryBase: "https://github.com/talo-pay/docs", // base URL for the docs repository
	titleSuffix: "Talo Docs",
	nextLinks: true,
	prevLinks: true,
	search: true,
	customSearch: null, // customizable, you can use algolia for example
	darkMode: true,
	footer: true,
	footerText: `MIT ${new Date().getFullYear()} © talo`,
	footerEditLink: `Edit this page on GitHub`,
	logo: <TaloLogo />,
	head: (
		<>
			<title>Talo Docs</title>
			<link
				rel="shortcut icon"
				href="/talo_isologo.svg"
				type="icon/png"
				sizes="32x32"
			></link>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta
				name="description"
				content="Documentation for talo cryptocurrencies integrations"
			/>
			<meta name="og:title" content="Talo Docs" />
		</>
	),
}
