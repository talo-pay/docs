export const simulatePayments = async (
	user_id,
	client_id,
	client_secret,
	address,
	amount
) => {
	// Primer request: obtener token
	const res = await fetch(
		`https://sandbox-api.talo.com.ar/users/${user_id}/tokens`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				client_id: client_id,
				client_secret: client_secret,
			}),
		}
	)
	const data = await res.json()
	if (!res.ok) throw new Error(data.message || "Error obteniendo token")

	// Extraer el token de la respuesta
	const token = data?.data?.token
	if (!token) throw new Error("No se pudo obtener el token de acceso")

	// Segundo request: simular pago
	const payRes = await fetch(
		`https://sandbox-api.talo.com.ar/cvu/${address}/faucet`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: Number(amount),
			}),
		}
	)
	const payData = await payRes.json()
	if (!payRes.ok) throw new Error(payData.message || "Error simulando pago")

	return {
		tokenResponse: data,
		paymentResponse: payData,
	}
}
