import Image from "next/image";
import styles from "./page.module.css";
import Login from "@/pages/form/Login";
import Signup from "@/pages/form/Signup";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Login/> */}
      <Signup/>
    </main>
  );
}
