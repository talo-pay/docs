import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import Script from "next/script"
import TaloLogo from "../components/logo/TaloLogo"
import "nextra-theme-docs/style.css"

export const metadata = {
	title: {
		default: "Talo Docs",
		template: "%s | Talo Docs",
	},
	description:
		"Documentación técnica de Talo Pay: transferencias bancarias, crypto, Pix e integraciones con Tiendanube, Shopify y WooCommerce.",
	icons: {
		icon: "/talo_isologo.svg",
	},
	openGraph: {
		title: "Talo Docs",
	},
}

export const viewport = {
	width: "device-width",
	initialScale: 1,
}

const navbar = <Navbar logo={<TaloLogo />} projectLink="https://talo.com.ar" />

const footer = <Footer>MIT {new Date().getFullYear()} © talo</Footer>

const GTM_ID = "GTM-PVCG962"

export default async function RootLayout({ children }) {
	return (
		<html lang="es" dir="ltr" suppressHydrationWarning>
			<Head>
				<Script id="gtm-script" strategy="afterInteractive">
					{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
				</Script>
			</Head>
			<body>
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
				<Layout
					navbar={navbar}
					pageMap={await getPageMap()}
					docsRepositoryBase="https://github.com/talo-pay/docs"
					editLink="Edit this page on GitHub"
					footer={footer}
					nextThemes={{ defaultTheme: "system" }}
				>
					{children}
				</Layout>
			</body>
		</html>
	)
}
