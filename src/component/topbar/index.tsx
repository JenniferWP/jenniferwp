import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeLogo from "../image/home.jpeg";
import GithubLogo from "../image/github.png";
import LinkedinLogo from "../image/linkedin.webp";
import ContactLogo from "../image/contact.png";
import "./topbar.css";

const TopBar = () => {
  const location = useLocation();
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) => setMatches(e.matches));
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

  const links: Array<{
    to: string;
    children: () => any;
    right?: boolean;
    target?: string;
  }> = [
    {
      to: "/home",
      children: () => createTopBarIcon(HomeLogo),
    },
    {
      to: "/about",
      children: () => createTopBarElement("/about", "A propos"),
    },
    {
      to: "/experience",
      children: () => createTopBarElement("/experience", "Expérience"),
    },
    {
      right: true,
      to: "/contact",
      children: () =>
        matches
          ? createTopBarIcon(ContactLogo)
          : createTopBarElement("/contact", "Me contacter"),
    },
    {
      right: true,
      to: "https://github.com/Jennifer-42",
      target: "_blank",
      children: () => createTopBarIcon(GithubLogo),
    },
    {
      right: true,
      to: "https://www.linkedin.com/in/jennifer-c-575b46153/",
      target: "_blank",
      children: () => createTopBarIcon(LinkedinLogo),
    },
  ];

  return (
    <div className={"containerTopBar"}>
      {links.length > 0 &&
        links
          .filter((link) => !link.right)
          .map((link) => (
            <Link
              key={link.to}
              className={"link"}
              to={link.to}
              target={link.target}
            >
              {link.children()}
            </Link>
          ))}
      <div className={"topBarRight"}>
        {links.length > 0 &&
          links
            .filter((link) => link.right)
            .map((link) => (
              <Link
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
