import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";

const TransferSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const sendSol = () => {
    if (!connection || !publicKey) {
      return;
    }

    try {
      const transaction = new web3.Transaction();

      const instruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new web3.PublicKey(address),
        lamports: +amount * web3.LAMPORTS_PER_SOL,
      });

      transaction.add(instruction);

      sendTransaction(transaction, connection).then((sig) => {
        console.log(sig);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (connection && publicKey) {
    return (
      <div className="flex flex-col  bg-white p-5 rounded-md">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Amount (in SOL) to send:
            </label>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="text"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Send SOL to:
            </label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              id="sendTo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ac7zibZGhP6X9LcRQxy57v4bubDqSd5wXbVsxR3jnRyd"
              required
            />
          </div>
        </div>

        <button
          onClick={sendSol}
          className="text-center border border-2 rounded-md px-10 py-1 bg-[#512da8] text-white font-bold"
        >
          Send
        </button>
      </div>
    );
  }
};

export default TransferSol;
