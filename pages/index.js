import { useState } from "react"
import WalletConnect from "../components/WalletConnect"
import { sendPaymentLink, promoteToken } from "../utils/promote"

export default function Home() {
  const [token, setToken] = useState("")
  const [tier, setTier] = useState("basic")
  const [phase, setPhase] = useState("pay") // pay -> promoting -> done

  const tierInfo = {
    basic: { label: "Basic – 0.2 SOL / 3 h", amount: 0.2 },
    viral: { label: "Viral – 0.5 SOL / 12 h", amount: 0.5 },
    vip: { label: "VIP – 1 SOL / 24 h", amount: 1 },
  }

  async function startPayment() {
    if (!token) return alert("Paste token address!")
    setPhase("promoting")
    const link = await sendPaymentLink(token, tier)
    window.location = link
  }

  return (
    <div className="container">
      <header><WalletConnect /></header>
      {phase === "pay" && (
        <>
          <input
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Paste meme token address"
          />
          <select value={tier} onChange={e => setTier(e.target.value)}>
            {Object.keys(tierInfo).map(k => (
              <option key={k} value={k}>{tierInfo[k].label}</option>
            ))}
          </select>
          <button onClick={startPayment}>
            Pay in SOL ({tierInfo[tier].amount} SOL)
          </button>
        </>
      )}
      {phase === "promoting" && (
        <button onClick={promoteToken}>Promote</button>
      )}
      <div id="recent"></div>
      <footer>
        <p className="disclaimer">
          We do not guarantee any returns or promise any specific results...
          © 2025 PumpMyMeme
        </p>
      </footer>
    </div>
  )
}
