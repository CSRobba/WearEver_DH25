import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <p className={styles.title}>WearEver</p>
      <p className={styles.subtitle}>WearEver. WhenEver. Wear Whatever</p>
    </div>
  );
}
