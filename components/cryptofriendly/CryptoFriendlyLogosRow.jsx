import BlackCryptoFriendlyLogo from "./BlackCryptoFriendlyLogo"
import TransparentCryptoFriendlyLogo from "./TransparentCryptoFriendlyLogo"
import WhiteCryptoFriendlyLogo from "./WhiteCryptoFriendlyLogo"

const CryptoFriendlyLogosRow = (props) => {
	return (
		<div style={{ display: "flex" }}>
			<BlackCryptoFriendlyLogo />
			<TransparentCryptoFriendlyLogo />
			<WhiteCryptoFriendlyLogo />
		</div>
	)
}

export default CryptoFriendlyLogosRow
