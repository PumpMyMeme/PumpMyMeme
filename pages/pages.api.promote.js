import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

export default async function handler(req, res) {
  const { token, tier } = JSON.parse(req.body)
  const text = `🚀 ${token} purchased *${tier.toUpperCase()}* promo`
  // Telegram
  await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method:"POST",
    body: new URLSearchParams({
      chat_id: process.env.TG_CHAT,
      text, parse_mode:"Markdown"
    })
  })
  // Twitter
  await fetch("https://api.twitter.com/2/tweets", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.TW_BEARER}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ text })
  })
  res.status(200).end()
}
