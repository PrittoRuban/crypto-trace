"use client";
import { useEffect, useState } from "react";
import { getUser, signOut } from "../../utils/auth";
import styles from "./page.module.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login"; // Redirect after sign out
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
