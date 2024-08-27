import Image from "next/image";
import styles from "./page.module.css";
import UserRegistration from "../Components/UserRegistration";

export default function Home() {
  return (
    <main className={styles.main}>
              <UserRegistration/>
    </main>
  );
}
