import Head from "next/head";
import Image from "next/image";
import DiveLocation from "../components/DiveLocationCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DiverList</title>
        <meta name="description" content="Top diving places in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Best Diving places in the World!</h1>

        <div className={styles.grid}>
          <DiveLocation location={"Cozumel"} />
          <DiveLocation location={"Galapagos"} />
          <DiveLocation location={"Malasia"} />
          <DiveLocation location={"Great Barrier Reef"} />
          <DiveLocation location={"Red Sea"} />
          <DiveLocation location={"Costa Rica"} />
        </div>
      </main>
    </div>
  );
}
