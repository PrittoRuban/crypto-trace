"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Trace({ params }) {
  const { id } = params;
  const [traceData, setTraceData] = useState(null);

  useEffect(() => {
    fetch(`/api/trace?id=${id}`)
      .then((res) => res.json())
      .then((data) => setTraceData(data));
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transaction Trace for: {id}</h1>
      {traceData ? (
        <div>{/* Render transaction data */}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
