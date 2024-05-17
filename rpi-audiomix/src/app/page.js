"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {motion} from "framer-motion"
import RecordIcon from "./components/recordIcon";
// import record from "./assets/record.png"

export default function Home() {
  return (
    <div className={styles.main}>
      {/* left box */}
      <div className={styles.fiftybox}>
        {/* top left double height box */}
        <div className={styles.doublevertbox}>
          <RecordIcon/>
        </div>
        {/* bottom left box */}
        <div className={styles.vertbox}>

        </div>
      </div>
      {/* right box */}
      <div className={styles.fiftybox}>
        {/* top right box */}
        <div className={styles.vertbox}>

        </div>
        {/* middle right box */}
        <div className={styles.vertbox}>

        </div>
        {/* bottom right box */}
        <div className={styles.vertbox}>

        </div>
      </div>
    </div>
  );
}
