import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "../../component/icon/menu";
import { Close as CloseIcon } from "../../component/icon/close";
import { TypeLinks } from ".";
import "./menu.css";

const Menu = ({
  displayMenu,
  onChangeDisplayMenu,
  links,
}: {
  displayMenu: boolean;
  onChangeDisplayMenu: (value: boolean) => void;
  links: TypeLinks;
}) => (
  <>
    <div className={displayMenu ? "containerMenuOpen" : ""}>
      <div
        onClick={() => onChangeDisplayMenu(!displayMenu)}
        className={"menuIcon"}
      >
        {displayMenu ? <CloseIcon /> : <MenuIcon />}
      </div>
      {displayMenu &&
        links.map((link) => (
          <Link
            onClick={() => onChangeDisplayMenu(false)}
            key={link.to}
            className={"link"}
            to={link.to}
            target={link.target}
          >
            {link.children()}
          </Link>
        ))}
    </div>
  </>
);

export { Menu };
