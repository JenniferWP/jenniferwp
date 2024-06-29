import WaveSvg from "../../component/icon/wave.svg";
import styles from "./wave.module.css";

const Wave = () => (
  <div className={styles.ocean}>
    <div
      className={styles.wave}
      style={{ background: `url(${WaveSvg}) repeat-x` }}
    />
    <div
      className={`${styles.wave} ${styles.wave2}`}
      style={{ background: `url(${WaveSvg}) repeat-x` }}
    />
  </div>
);

export { Wave };
