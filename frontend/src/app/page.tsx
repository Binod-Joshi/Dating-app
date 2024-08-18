import Image from "next/image";
import styles from "./page.module.css";
import Login from "@/pages/form/Login";
import Signup from "@/pages/form/Signup";
import TinderCarousel from "@/components/carousel/TinderCarousel";

export default function Home() {
  return (
    <main>
      {/* <Login/> */}
      {/* <Signup/> */}
      <TinderCarousel/>
    </main>
  );
}
