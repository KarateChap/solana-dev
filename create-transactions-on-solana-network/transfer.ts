// import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, clusterApiUrl } from "@solana/web3.js";
// import "dotenv/config";
// import {getKeypairFromEnvironment} from "@solana-developers/helpers";

// const connection = new Connection(clusterApiUrl("devnet"));

// const keypair = getKeypairFromEnvironment("SECRET_KEY");

// await requestAndConfirmAirdropIfRequired() {
//     connection,
//     keypair.publicKey,
//     1 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL
// }

// const transaction = new Transaction();

// const sendSolInstruction = SystemProgram.transfer({
//   fromPubkey: sender,
//   toPubkey: recipient,
//   lamports: LAMPORTS_PER_SOL * amount,
// });

// transaction.add(sendSolInstruction);

// const signature = sendAndConfirmTransaction(connection, transaction, [
//   senderKeypair,
// ]);

import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `✅ Loaded our own keypair, the destiation public key, and connected to Solana`
);

const transaction = new Transaction();

const SOL_TO_SEND = 1;

const LAMPORTS_TO_SEND = SOL_TO_SEND * LAMPORTS_PER_SOL;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}`);
console.log(`Transaction signature is ${signature}!`);
