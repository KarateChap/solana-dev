import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubKey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to solana`
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
