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
  end: boolean;
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
      to === location.pathname ? "var(--beige-color)" : "var(--white-color)",
    borderBottom:
      to === location.pathname ? "1px solid var(--beige-color)" : "",
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
      end: false,
    },
    {
      to: "/about",
      children: () => createTopBarElement("/about", "A propos"),
      end: false,
    },
    {
      to: "/experience",
      children: () => createTopBarElement("/experience", "Expérience"),
      end: state.matchesMobile,
    },
    {
      to: "/contact",
      children: () => createTopBarElement("/contact", "Me contacter"),
      end: !state.matchesMobile,
    },
    {
      to: "https://github.com/JenniferWP",
      target: "_blank",
      children: () => createTopBarIcon(GithubLogo),
      end: true,
    },
    {
      to: "https://www.linkedin.com/in/jennifer-c-575b46153/",
      target: "_blank",
      children: () => createTopBarIcon(LinkedinLogo),
      end: true,
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
          links={links.filter((link) => !link.end)}
        />
      ) : (
        links.length > 0 &&
        links
          .filter((link) => !link.end)
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
            .filter((link) => link.end)
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
