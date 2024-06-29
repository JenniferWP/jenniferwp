import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeLogo from "../../component/image/logo.png";
import GithubLogo from "../../component/image/github.png";
import LinkedinLogo from "../../component/image/linkedin.webp";
import { Menu } from "./menu";
import "./topbar.css";

export type TypeLinks = Array<{
  to: string;
  children: () => any;
  mobileRight: boolean;
  target?: string;
}>;

const TopBar = () => {
  const location = useLocation();
  const [state, setState] = useState({
    matchesMobile: window.matchMedia("(max-width: 767px)").matches,
    displayMenu: false,
  });

  useEffect(() => {
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) =>
        setState({ ...state, matchesMobile: e.matches }),
      );
    // eslint-disable-next-line
  }, []);

  const getStyleByTab = (to: string) => ({
    color:
      to === location.pathname ? "var(--orange-color)" : "var(--white-color)",
    borderBottom:
      to === location.pathname ? "1px solid var(--orange-color)" : "",
  });

  const createTopBarIcon = (src: string) => (
    <span className={"containerLogo"}>
      <img alt={src} className={"logo"} src={src} />
    </span>
  );

  const createTopBarElement = (to: string, text: string) => (
    <span className={"linkChildren"} style={getStyleByTab(to)}>
      {text}
    </span>
  );

  const links: TypeLinks = [
    {
      to: "/home",
      children: () =>
        state.matchesMobile
          ? createTopBarElement("/home", "Accueil")
          : createTopBarIcon(HomeLogo),
      mobileRight: false,
    },
    {
      to: "/about",
      children: () => createTopBarElement("/about", "A propos"),
      mobileRight: false,
    },
    {
      to: "/experience",
      children: () => createTopBarElement("/experience", "Expérience"),
      mobileRight: state.matchesMobile,
    },
    {
      to: "/game",
      children: () => createTopBarElement("/game", "Jeux en vrac"),
      mobileRight: false,
    },
    {
      to: "/contact",
      children: () => createTopBarElement("/contact", "Me contacter"),
      mobileRight: !state.matchesMobile,
    },
    {
      to: "https://github.com/JenniferWP",
      target: "_blank",
      children: () => createTopBarIcon(GithubLogo),
      mobileRight: true,
    },
    {
      to: "https://www.linkedin.com/in/jennifer-c-575b46153/",
      target: "_blank",
      children: () => createTopBarIcon(LinkedinLogo),
      mobileRight: true,
    },
  ];

  return (
    <div className={"containerTopBar"}>
      {state.matchesMobile ? (
        <Menu
          displayMenu={state.displayMenu}
          onChangeDisplayMenu={(value: boolean) =>
            setState({ ...state, displayMenu: value })
          }
          links={links.filter((link) => !link.mobileRight)}
        />
      ) : (
        links.length > 0 &&
        links
          .filter((link) => !link.mobileRight)
          .map((link) => (
            <Link
              key={link.to}
              className={"link"}
              to={link.to}
              target={link.target}
            >
              {link.children()}
            </Link>
          ))
      )}
      <div className={"topBarRight"}>
        {links.length > 0 &&
          links
            .filter((link) => link.mobileRight)
            .map((link) => (
              <Link
                onClick={() => setState({ ...state, displayMenu: false })}
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
  );
};

export { TopBar };
