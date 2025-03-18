import "dotenv/config";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const mint = new PublicKey("Anf7RzaePBbtzNCYAEtquerddMcMvbtQaYxhD7RRSfaz")

async function mintToken(amount: number, mint: PublicKey) {
    const connection = new Connection(clusterApiUrl("devnet"));
    const payer = getKeypairFromEnvironment("SECRET_KEY");

    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, payer, mint, payer.publicKey
    )

    const sig = await mintTo(connection, payer, mint, associatedTokenAccount.address, payer, amount)
    const link = getExplorerLink("transaction", sig, "devnet");

    console.log(`minted ${amount} tokens to ${associatedTokenAccount.address} - ${link}`)
}

mintToken(100* 10**9, mint);