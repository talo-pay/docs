"use client"

import React, { useState } from "react"

const SANDBOX_API_URL = "https://sandbox-api.talo.com.ar/auth/sandbox/partners"

export const SandboxPartnerForm = () => {
	const [form, setForm] = useState({
		name: "",
		slug: "",
		redirect_url: "",
		commission: "",
		account_webhook_url: "",
	})
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState(null)
	const [error, setError] = useState(null)

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setResult(null)
		setError(null)
		try {
			const body = {
				name: form.name,
				slug: form.slug,
				redirect_url: form.redirect_url,
				commission: parseFloat(form.commission),
			}
			if (form.account_webhook_url) {
				body.account_webhook_url = form.account_webhook_url
			}
			const res = await fetch(SANDBOX_API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
			const data = await res.json()
			if (data.error) {
				throw new Error(data.message || "Error al crear el partner")
			}
			setResult(data.data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

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
		background: "linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)",
		color: "#fff",
		fontWeight: 600,
		fontSize: 16,
		border: "none",
		borderRadius: 8,
		cursor: loading ? "not-allowed" : "pointer",
		marginTop: 8,
		marginBottom: 8,
		boxShadow: "0 2px 8px 0 rgba(99,102,241,0.08)",
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
	const credentialBoxStyle = {
		background: "#f0fdf4",
		border: "1px solid #bbf7d0",
		borderRadius: 8,
		padding: 18,
		marginTop: 16,
	}
	const credentialLabelStyle = {
		fontWeight: 600,
		fontSize: 13,
		color: "#15803d",
		textTransform: "uppercase",
		letterSpacing: "0.05em",
		marginBottom: 4,
	}
	const credentialValueStyle = {
		fontFamily: "monospace, monospace",
		fontSize: 14,
		color: "#222",
		wordBreak: "break-all",
		background: "#fff",
		padding: "8px 12px",
		borderRadius: 6,
		border: "1px solid #d1d5db",
		marginBottom: 12,
	}
	const warningStyle = {
		background: "#fffbeb",
		border: "1px solid #fde68a",
		borderRadius: 8,
		padding: "12px 16px",
		marginTop: 12,
		fontSize: 14,
		color: "#92400e",
	}

	const isMd = typeof window !== "undefined" && window.innerWidth > 600

	return (
		<>
			<form onSubmit={handleSubmit} style={formStyle}>
				<div style={isMd ? rowMdStyle : rowStyle}>
					<div style={inputGroupStyle}>
						<label htmlFor="name" style={labelStyle}>
							Nombre del partner
						</label>
						<input
							id="name"
							name="name"
							placeholder="Ej: Mi Plataforma"
							value={form.name}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
					<div style={inputGroupStyle}>
						<label htmlFor="slug" style={labelStyle}>
							Slug
						</label>
						<input
							id="slug"
							name="slug"
							placeholder="Ej: mi_plataforma"
							value={form.slug}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
				</div>
				<div style={inputGroupStyle}>
					<label htmlFor="redirect_url" style={labelStyle}>
						URL de redirección
					</label>
					<input
						id="redirect_url"
						name="redirect_url"
						type="url"
						placeholder="https://tu-plataforma.com/callback"
						value={form.redirect_url}
						onChange={handleChange}
						style={inputStyle}
						disabled={loading}
						required
					/>
				</div>
				<div style={isMd ? rowMdStyle : rowStyle}>
					<div style={inputGroupStyle}>
						<label htmlFor="commission" style={labelStyle}>
							Comisión (%)
						</label>
						<input
							id="commission"
							name="commission"
							type="number"
							min="0"
							max="5"
							step="0.1"
							placeholder="Ej: 2"
							value={form.commission}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
							required
						/>
					</div>
					<div style={inputGroupStyle}>
						<label htmlFor="account_webhook_url" style={labelStyle}>
							Webhook URL (opcional)
						</label>
						<input
							id="account_webhook_url"
							name="account_webhook_url"
							type="url"
							placeholder="https://tu-plataforma.com/webhooks"
							value={form.account_webhook_url}
							onChange={handleChange}
							style={inputStyle}
							disabled={loading}
						/>
					</div>
				</div>
				<button type="submit" style={buttonStyle} disabled={loading}>
					{loading ? "Creando..." : "Crear credenciales de partner"}
				</button>
				{error && (
					<div style={{ color: "#dc2626", marginTop: 8 }}>
						<strong>Error:</strong> {error}
					</div>
				)}
			</form>
			{result && (
				<div style={{ maxWidth: 500, margin: "16px auto 0 auto" }}>
					<div style={credentialBoxStyle}>
						<div style={credentialLabelStyle}>Partner ID (client_id)</div>
						<div style={credentialValueStyle}>{result.partner_id}</div>
						<div style={credentialLabelStyle}>Client Secret</div>
						<div style={credentialValueStyle}>{result.client_secret}</div>
					</div>
					<div style={warningStyle}>
						<strong>Importante:</strong> Guardá el <code>client_secret</code> en un lugar seguro. No podrás recuperarlo después. Si lo perdés, creá un nuevo partner.
					</div>
				</div>
			)}
		</>
	)
}