import React, { useState } from "react"
import { simulatePayments } from "../api_data/simulatePayments"

const codeSnippets = (form, token) => {
	const { user_id, client_id, client_secret, cvu_destino, monto } = form
	return {
		curl: `# Obtener token\ncurl -X POST https://sandbox-api.talo.com.ar/users/${
			user_id || ":user_id"
		}/tokens \\
-H "Content-Type: application/json" \\
-d '{"client_id": "${client_id || "CLIENT_ID"}", "client_secret": "${
			client_secret || "CLIENT_SECRET"
		}"}'\n\n# Simular pago\ncurl -X POST 'https://sandbox-api.talo.com.ar/cvu/${
			cvu_destino || "CVU"
		}/faucet' \\
--header 'Authorization: Bearer ${token || "{accessToken}"}' \\
--header 'Content-Type: application/json' \\
--data-raw '{"amount": ${monto || "AMOUNT"}}'`,
		node: `// Obtener token
const fetch = require('node-fetch');

fetch('https://sandbox-api.talo.com.ar/users/${user_id || ":user_id"}/tokens', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		client_id: '${client_id || "CLIENT_ID"}',
		client_secret: '${client_secret || "CLIENT_SECRET"}'
	})
})
	.then(res => res.json())
	.then(data => {
		const token = data?.data?.token;
		// Simular pago
		return fetch('https://sandbox-api.talo.com.ar/cvu/${
			cvu_destino || "CVU"
		}/faucet', {
			method: 'POST',
			headers: {
				'Authorization': \`Bearer ${token || "{accessToken}"}\`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: ${monto || "AMOUNT"} })
		})
	})
	.then(res => res.json())
	.then(console.log)
	.catch(console.error);`,
		python: `# Obtener token
import requests

url = 'https://sandbox-api.talo.com.ar/users/${user_id || ":user_id"}/tokens'
data = {
	'client_id': '${client_id || "CLIENT_ID"}',
	'client_secret': '${client_secret || "CLIENT_SECRET"}'
}
response = requests.post(url, json=data)
token = response.json().get('data', {}).get('token')

# Simular pago
headers = {'Authorization': f'Bearer {token or '{accessToken}'}', 'Content-Type': 'application/json'}
pay_data = {'amount': ${monto || "AMOUNT"}}
pay_response = requests.post('https://sandbox-api.talo.com.ar/cvu/${
			cvu_destino || "CVU"
		}/faucet', json=pay_data, headers=headers)
print(pay_response.json())`,
	}
}

export const SimulatorForm = () => {
	const [form, setForm] = useState({
		user_id: "",
		client_id: "",
		client_secret: "",
		cvu_destino: "",
		monto: "",
	})
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState(null)
	const [error, setError] = useState(null)
	const [tab, setTab] = useState("curl")

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setResult(null)
		setError(null)
		try {
			const data = await simulatePayments(
				form.user_id,
				form.client_id,
				form.client_secret,
				form.cvu_destino,
				form.monto
			)
			setResult(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	// Estilos inline inspirados en el ejemplo de Tailwind
	const labelStyle = {
		fontWeight: 500,
		marginBottom: 4,
		display: "block",
		color: "#222",
	}
	const inputStyle = {
		width: "100%",
		padding: "10px 12px",
		border: "1px solid #d1d5db",
		borderRadius: 6,
		fontSize: 16,
		marginBottom: 8,
		background: "#f9fafb",
		outline: "none",
		transition: "border 0.2s",
		boxSizing: "border-box",
	}
	const inputGroupStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 4,
		marginBottom: 16,
		flex: 1,
	}
	const rowStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 0,
		marginBottom: 0,
	}
	const rowMdStyle = {
		display: "flex",
		flexDirection: "row",
		gap: 16,
		marginBottom: 0,
	}
	const buttonStyle = {
		width: "100%",
		padding: "12px 0",
		background: "linear-gradient(90deg, #22c55e 0%, #059669 100%)",
		color: "#fff",
		fontWeight: 600,
		fontSize: 16,
		border: "none",
		borderRadius: 8,
		cursor: loading ? "not-allowed" : "pointer",
		marginTop: 8,
		marginBottom: 8,
		boxShadow: "0 2px 8px 0 rgba(34,197,94,0.08)",
		transition: "background 0.2s, box-shadow 0.2s",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	}
	const formStyle = {
		maxWidth: 500,
		margin: "0 auto",
		background: "#fff",
		borderRadius: 12,
		boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06)",
		padding: 28,
		display: "flex",
		flexDirection: "column",
		gap: 16,
	}
	const iconStyle = {
		display: "inline-block",
		verticalAlign: "middle",
	}
	const tabBarStyle = {
		display: "flex",
		gap: 8,
		marginTop: 24,
		marginBottom: 0,
	}
	const tabStyle = (active) => ({
		padding: "6px 18px",
		borderRadius: 6,
		border: active ? "1px solid #059669" : "1px solid #e5e7eb",
		background: active ? "#e0fce2" : "#f9fafb",
		color: active ? "#059669" : "#222",
		fontWeight: active ? 600 : 500,
		cursor: "pointer",
		fontSize: 15,
		outline: "none",
		transition: "all 0.15s",
	})
	const codeBoxStyle = {
		background: "#f1f5f9",
		borderRadius: 8,
		padding: 18,
		marginTop: 0,
		fontSize: 15,
		fontFamily: "monospace, monospace",
		color: "#222",
		whiteSpace: "pre-wrap",
		wordBreak: "break-all",
		boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
	}

	// Responsive: si la pantalla es mayor a 600px, usa rowMdStyle
	const isMd = typeof window !== "undefined" && window.innerWidth > 600

	// El token real solo se muestra si hay resultado
	const token = result?.tokenResponse?.data?.token
	const snippets = codeSnippets(form, token)

	return (
		<>
			<form onSubmit={handleSubmit} style={formStyle}>
				<div style={isMd ? rowMdStyle : rowStyle}>
					<div style={inputGroupStyle}>
						<label htmlFor="user_id" style={labelStyle}>
							User ID
						</label>
						<input
							id="user_id"
							name="user_id"
							placeholder="Ej: 12345"
							value={form.user_id}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
					<div style={inputGroupStyle}>
						<label htmlFor="client_id" style={labelStyle}>
							Client ID
						</label>
						<input
							id="client_id"
							name="client_id"
							placeholder="Ej: A13NDKD3534JEM"
							value={form.client_id}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
				</div>
				<div style={inputGroupStyle}>
					<label htmlFor="client_secret" style={labelStyle}>
						Client Secret
					</label>
					<input
						id="client_secret"
						name="client_secret"
						type="password"
						placeholder="Ej: ma43rngw485u5p9kjh2hsfd9g8s0323j4kjlkdjsfda9"
						value={form.client_secret}
						onChange={handleChange}
						style={inputStyle}
						disabled={loading}
						required
					/>
				</div>
				<div style={isMd ? rowMdStyle : rowStyle}>
					<div style={inputGroupStyle}>
						<label htmlFor="cvu_destino" style={labelStyle}>
							CVU Destino
						</label>
						<input
							id="cvu_destino"
							name="cvu_destino"
							placeholder="Ej: 0000003100010000000001"
							value={form.cvu_destino}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
					<div style={inputGroupStyle}>
						<label htmlFor="monto" style={labelStyle}>
							Monto (ARS)
						</label>
						<input
							id="monto"
							name="monto"
							type="number"
							min="1"
							step="0.01"
							placeholder="Ej: 1000"
							value={form.monto}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
				</div>
				<button type="submit" style={buttonStyle} disabled={loading}>
					{loading ? (
						<>
							<span style={iconStyle}>⏳</span> Procesando...
						</>
					) : (
						<>
							<span style={iconStyle}>💸</span> Enviar Dinero de Prueba
						</>
					)}
				</button>
				{result && (
					<div style={{ color: "green", marginTop: 8 }}>
						<strong>Token obtenido:</strong>{" "}
						<pre>{JSON.stringify(result.tokenResponse, null, 2)}</pre>
						<strong>Respuesta del pago simulado:</strong>{" "}
						<pre>{JSON.stringify(result.paymentResponse, null, 2)}</pre>
					</div>
				)}
				{error && (
					<div style={{ color: "red", marginTop: 8 }}>
						<strong>Error:</strong> {error}
					</div>
				)}
			</form>
			<div style={{ maxWidth: 500, margin: "24px auto 0 auto" }}>
				<div style={tabBarStyle}>
					<button
						type="button"
						style={tabStyle(tab === "curl")}
						onClick={() => setTab("curl")}
					>
						cURL
					</button>
					<button
						type="button"
						style={tabStyle(tab === "node")}
						onClick={() => setTab("node")}
					>
						Node.js
					</button>
					<button
						type="button"
						style={tabStyle(tab === "python")}
						onClick={() => setTab("python")}
					>
						Python
					</button>
				</div>
				<pre style={codeBoxStyle}>{snippets[tab]}</pre>
			</div>
		</>
	)
}
