import "dotenv/config";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection, clusterApiUrl } from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";


async function createTokenMint() {

    const connection = new Connection(clusterApiUrl("devnet"));
    const payer = getKeypairFromEnvironment("SECRET_KEY");

    const mint = await createMint(
        connection, payer, payer.publicKey, null, 9     
    )

    const link = getExplorerLink("address", mint.toBase58(), "devnet");

    console.log(`created mint ${mint.toBase58()} at ${link}`);

}

createTokenMint();