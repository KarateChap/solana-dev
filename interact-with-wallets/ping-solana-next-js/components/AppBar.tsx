import { FC } from "react";
import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import dynamic from "next/dynamic";

export const AppBar: FC = () => {
  // add this
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} alt="" />
      <span className="text-xl font-bold">Wallet Adapter Example</span>
      <WalletMultiButtonDynamic />
    </div>
  );
};
