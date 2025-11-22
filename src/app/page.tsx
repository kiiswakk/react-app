import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
  <>
  <header className={styles.header}>
    Шапка
  </header>
  <main className={styles.main}>
    Основное
  </main>
  <footer className={styles.footer}>
    Подвал
  </footer>
  </>

  );
}
