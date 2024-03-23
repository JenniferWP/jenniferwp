import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "../icon/menu";
import { Close } from "../icon/close";
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
}) => {
  return (
    <div>
      <div onClick={() => onChangeDisplayMenu(true)} className={"menuCross"}>
        <MenuIcon />
      </div>
      {displayMenu && (
        <div>
          <div className={"containerMenuOpen"}>
            <div
              onClick={() => onChangeDisplayMenu(false)}
              className={"menuCross"}
            >
              <Close />
            </div>
            {links.map((link) => (
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
        </div>
      )}
    </div>
  );
};

export { Menu };
