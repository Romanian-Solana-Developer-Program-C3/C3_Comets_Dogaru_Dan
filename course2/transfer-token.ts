import "dotenv/config";
import { clusterApiUrl } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { PublicKey } from "@solana/web3.js";
import { transferChecked } from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";

const transferTo = new PublicKey("6745K9NgXRb75tbNin7GXjqYkZs8nBvdKESbq9jRGA1S")
const mint = new PublicKey("Anf7RzaePBbtzNCYAEtquerddMcMvbtQaYxhD7RRSfaz")
const payer = getKeypairFromEnvironment("SECRET_KEY")



async function transferToken(amount: number, source: PublicKey, to: PublicKey) {
    const connection = new Connection(clusterApiUrl("devnet"), {
        commitment: "confirmed"
    });

    const sourceAta = getAssociatedTokenAddressSync(mint, source)

    const destinationAta = await getOrCreateAssociatedTokenAccount(
        connection, payer, mint, to
    )

    const sig = await transferChecked(
        connection, 
        payer, 
        sourceAta, 
        mint, 
        destinationAta.address, 
        payer, 
        amount, 
        9,
        [], // Additional signers (empty in this case)
        {
            commitment: "confirmed",
            skipPreflight: false,
            preflightCommitment: "confirmed",
            maxRetries: 5
        }
    )
    const link = getExplorerLink("tx", sig, "devnet");

    console.log(`transferred ${amount} tokens to ${transferTo} - ${link}`)
}

transferToken(10* 10**9, payer.publicKey, transferTo);