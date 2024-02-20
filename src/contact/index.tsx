import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "../component/button";
import { Input } from "../component/input";
import { TextArea } from "../component/textarea";
import "./contact.css";

const Contact = () => {
  const initialState: {
    name?: string;
    mail?: string;
    subject?: string;
    message?: string;
    disabledForm: boolean;
    errors?: {
      name?: { value: boolean; message: string };
      mail?: { value: boolean; message: string };
      subject?: { value: boolean; message: string };
      message?: { value: boolean; message: string };
    };
  } = { disabledForm: true };
  const [state, setState] = useState(initialState);

  emailjs.init({
    publicKey: "0Bhoz8QMe66kgkIkL",
    blockHeadless: true,
    blockList: {
      watchVariable: "userEmail",
    },
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  const sendMail = () => {
    console.log(state);
    if (state.name && state.mail && state.subject && state.message) {
      state.disabledForm = true;
      // emailjs.send("service_w42kcn9", "template_ti2qa1a", { ...state }).then(
      //   (_) => {
      setState({ ...state, name: "", subject: "", mail: "", message: "" });
    } else {
      setState({
        ...state,
        errors: {
          ...state.errors,
          name: { value: true, message: "Champ requis" },
          mail: { value: true, message: "Champ requis" },
          subject: { value: true, message: "Champ requis" },
          message: { value: true, message: "Champ requis" },
        },
      });
    }
    //   },
    //   (error) => {
    //     console.log("FAILED...", error);
    //   },
    // );
  };

  return (
    <div className={"containerForm"}>
      <div className={"form"}>
        <div className={"formTitle"}>Formulaire de contact</div>
        <Input
          label={"Nom *"}
          value={state.name}
          error={state.errors?.name}
          onChange={(name: string) =>
            setState({
              ...state,
              name,
              disabledForm: false,
              errors: { ...state.errors, name: { value: false, message: "" } },
            })
          }
        />
        <Input
          label={"Adresse mail *"}
          value={state.mail}
          error={state.errors?.mail}
          onChange={(mail: string) =>
            setState({
              ...state,
              mail,
              disabledForm: false,
              errors: { ...state.errors, mail: { value: false, message: "" } },
            })
          }
        />
        <Input
          label={"Objet *"}
          value={state.subject}
          error={state.errors?.subject}
          onChange={(subject: string) =>
            setState({
              ...state,
              subject,
              disabledForm: false,
              errors: {
                ...state.errors,
                subject: { value: false, message: "" },
              },
            })
          }
        />
        <TextArea
          label={"Votre message *"}
          value={state.message}
          error={state.errors?.message}
          onChange={(message: string) =>
            setState({
              ...state,
              message,
              disabledForm: false,
              errors: {
                ...state.errors,
                message: { value: false, message: "" },
              },
            })
          }
        />
        <Button
          label={"Envoyer"}
          onClick={sendMail}
          width={"70%"}
          disabled={state.disabledForm}
        />
      </div>
    </div>
  );
};

export { Contact };
