import "dotenv/config";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const recipient = new PublicKey("6745K9NgXRb75tbNin7GXjqYkZs8nBvdKESbq9jRGA1S");

console.log("Sending SOL to:", recipient.toBase58());

const keypair = getKeypairFromEnvironment("SECRET_KEY");


const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: recipient,
    lamports: 0.1 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

const connection = new Connection(clusterApiUrl("devnet"));


(async () => {
    try {
      const signature = await connection.sendTransaction(transaction, [keypair]);
      console.log(`Transaction sent with signature: ${signature}`);
  
      // Optionally, confirm the transaction
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transaction confirmed:', confirmation);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  })();

