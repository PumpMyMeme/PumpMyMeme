"use client"
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react"
import {
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets"
import "react-toastify/dist/ReactToastify.css"

export default function WalletConnect({ children }) {
  const wallets = [new PhantomWalletAdapter()]

  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <WalletMultiButton />
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
