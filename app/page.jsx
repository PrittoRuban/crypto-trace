"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css"; // Scoped CSS module

export default function Home() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/trace/${input}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trace Ethereum Transactions</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Wallet ID or Transaction Hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Trace</button>
      </form>
    </div>
  );
}
