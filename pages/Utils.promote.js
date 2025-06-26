import { encodeURL, findReference, validateTransfer } from "@solana/pay"
import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js"
import fetch from "node-fetch"
import BigNumber from "bignumber.js"

const RECIPIENT = new PublicKey("8Gqbj5vuzcvAmV4sCX4os58BM82DmLa6VFyiHk1nH7Kp")

export async function sendPaymentLink(token, tier) {
  const amounts = { basic:0.2, viral:0.5, vip:1 }
  const amount = new BigNumber(amounts[tier])
  const reference = new PublicKey(encodeURL({ recipient:RECIPIENT, amount }).params.reference)
  const url = encodeURL({ recipient:RECIPIENT, amount, reference, memo:token })
  queueReference(reference, token, tier) // store temporarily
  return url.toString()
}

async function queueReference(ref, token, tier) {
  localStorage.setItem("promoRef", JSON.stringify({ref,token,tier}))
}

export async function promoteToken() {
  const item = JSON.parse(localStorage.getItem("promoRef"))
  if (!item) return alert("Payment not found!")
  const conn = new Connection(clusterApiUrl("mainnet-beta"))
  const sigInfo = await findReference(conn, new PublicKey(item.ref), {finality:"confirmed"})
  await validateTransfer(conn, sigInfo.signature, { recipient: RECIPIENT })
  // Auto post
  await fetch("/api/promote", {
    method:"POST",
    body: JSON.stringify(item)
  })
  window.location = "/?status=done"
}
