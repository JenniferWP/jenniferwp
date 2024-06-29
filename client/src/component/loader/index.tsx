import { Button } from "../button";
import styles from "./loader.module.css";

const Loader = ({
  text,
  action,
  onClick,
}: {
  text: string;
  action: boolean;
  onClick: () => void;
}) => (
  <div className={styles.containerLoader}>
    <div className={styles.loader}>
      {!action && <div className={styles.invisibleLoader} />}
      <div>{text}</div>
    </div>
    {action && <Button onClick={onClick}>Ok</Button>}
  </div>
);

export { Loader };
