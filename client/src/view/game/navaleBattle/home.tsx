import { useState } from "react";
import { Button } from "../../../component/button";
import { getNavaleBattleButtonStyle } from "./utils";
import { TypeVersus } from "./type";
import styles from "./navaleBattle.module.css";

const Home = ({
  socketRoom,
  matchesMobile,
  loadPlacement,
}: {
  socketRoom: string;
  matchesMobile: boolean;
  loadPlacement: (versus: TypeVersus) => void;
}) => {
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <div className={styles.containerHome}>
      <div className={styles.gameName}>BIENVENUE SUR LA BATAILLE NAVALE !</div>
      <div className={styles.viewSubTitle}>
        L'objectif ? Détruire les navires de l'ennemi avant que les tiens ne le
        soient ! C'est parti !
      </div>
      <div>Pour commencer, sélectionnez le nombre de joueurs</div>
      <div className={styles.containerActions}>
        <div className={styles.actions}>
          <div>1 joueur</div>
          <Button
            onClick={() => loadPlacement(TypeVersus.COMPUTER)}
            style={getNavaleBattleButtonStyle(matchesMobile)}
          >
            Commencer à jouer
          </Button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <div>2 joueurs</div>
          <Button
            onClick={async () => {
              if (linkCopied) loadPlacement(TypeVersus.PLAYER);
              else {
                if (window.isSecureContext) {
                  await window.navigator.clipboard.writeText(
                    `https://jenniferwp.fr/game?join_room=${socketRoom}`,
                  );
                }
                setLinkCopied(true);
              }
            }}
            style={getNavaleBattleButtonStyle(matchesMobile)}
          >
            {linkCopied ? "Commencer à jouer" : "Copier un lien d'invitation"}
          </Button>
          {linkCopied && (
            <div className={styles.linkCopied}>
              Lien copié ! Une fois ce lien envoyé à l'ennemi, cliquez à nouveau
              sur ce bouton pour commencer à jouer
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Home };
