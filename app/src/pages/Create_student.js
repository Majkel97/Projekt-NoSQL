import React, {useState} from "react";
import { H2 } from "@leafygreen-ui/typography";
import TextInput from '@leafygreen-ui/text-input';
import FormFooter from "@leafygreen-ui/form-footer";
import Toast from "@leafygreen-ui/toast";
import { css } from "@leafygreen-ui/emotion";
import { baseUrl } from "../config";

const formStyle = css`
  height: 100vh;
  min-width: 767px;
  margin: 10px;

  input {
    margin-bottom: 20px;
  }
`

export default function App() {
  let [ imie, setImie ] = useState("");
  let [ nazwisko, setNazwisko ] = useState("");
  let [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = async () => {
    await fetch(`${baseUrl}/posts/student`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        imie, nazwisko
      })
    }).then(resp => resp.json());
    setImie("");
    setNazwisko("");
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  }

  return (
    <React.Fragment>
      <H2>Dodaj studenta</H2>
      <form className={formStyle}>
        <TextInput
          label="Imie"
          description="Podaj imie studenta"
          onChange={e => setImie(e.target.value)}
          value={imie}
        />
        <TextInput
          label="Nazwisko"
          description="Podaj nazwisko studenta"
          onChange={e => setNazwisko(e.target.value)}
          value={nazwisko}
        />
        <FormFooter
          primaryButton={{
            text: 'Dodaj',
            onClick: handleSubmit
          }}
        />
      </form>

      <Toast
        variant="success"
        title="Student dodany"
        body="Student dodany pomyślnie"
        open={toastOpen}
        close={() => setToastOpen(false)}
      />
    </React.Fragment>
  )
}