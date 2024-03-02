// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
// import "dotenv/config";
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const keypair = getKeypairFromEnvironment("SECRET_KEY");

// const publicKey = new PublicKey(keypair.publicKey);

// console.log(keypair.publicKey.toBase58());

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

// console.log(
//   `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
// );

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

try {
  const publicKey = new PublicKey(suppliedPublicKey);
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}`
  );
} catch (error) {
  console.error(`❌ Error fetching balance: ${error}`);
}
