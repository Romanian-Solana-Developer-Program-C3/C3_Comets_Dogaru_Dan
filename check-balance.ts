import "dotenv/config";
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`);

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publicKey = keypair.publicKey;

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);