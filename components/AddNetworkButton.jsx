import styles from "./AddNetworkButton.module.css"

const AddNetworkButton = (props) => {
	console.log("PROPS===", props)
	const handleOnClick = async () => {
		console.log("CLICKED ADD NETWORK")
		console.log("ethereum ", window.ethereum)
		try {
			await ethereum.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: "0x61", // A 0x-prefixed hexadecimal string
						chainName: "Smart Chain - Testnet",
						nativeCurrency: {
							name: "BNB",
							symbol: "BNB", // 2-6 characters long
							decimals: 18,
						},
						rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
						blockExplorerUrls: ["https://testnet.bscscan.com"],
					},
				],
			})
		} catch (err) {
			console.log("ERROR===", err)
		}
	}

	const isDark = () => {
		if (process && process.browser)
			return document.documentElement.classList.contains("dark")
	}

	return (
		<span className={styles.addButton} style={props.style}>
			<button
				style={{
					backgroundColor: isDark() ? "#1e293b" : "rgba(237,242,247,1)",
				}}
				onClick={handleOnClick}
			>
				<img
					className="mr-1"
					width="15"
					src="/metamask-icon.svg"
					alt="Metamask"
				/>
				Add BSC Testnet Network to Metamask Wallet
			</button>
		</span>
	)
}
export default AddNetworkButton
