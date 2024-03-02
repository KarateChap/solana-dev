// export type TransactionInstructionCtorFields = {
//     keys: Array<AccountMeta>;
//     programId: PublicKey;
//     data?: Buffer;
// }

// const instruction = new web3.TransactionInstruction({
//     keys: [
//         {
//             pubkey: programDataAccount,
//             isSigner: false,
//             isWritable: true,
//         },
//     ],
//     programId,
// })

// const transaction = new web3.Transaction().add(instruction)

// const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer])

// console.log(`✅ Success! Transaction signature is: ${signature}`);
