import React, { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import TextInput from '@leafygreen-ui/text-input';
import TextArea from "@leafygreen-ui/text-area";
import FormFooter from "@leafygreen-ui/form-footer";
import Toast from "@leafygreen-ui/toast";
import { css } from "@leafygreen-ui/emotion";
import { baseUrl } from "../config";

const formStyle = css`
  height: 100vh;
  min-width: 767px;
  margin: 10px;

  select,
  input {
    margin-bottom: 20px;
  }
`;

export default function App() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [odbiorca, setReipent] = useState("");
  const [tresc, setBody] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts/students`);

        if (!response.ok) {
          throw new Error(`Failed to fetch students. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.students || !Array.isArray(data.students)) {
          throw new Error("Invalid data structure from the server");
        }

        setStudents(data.students);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!student || !odbiorca || !tresc) {
      console.error("All fields are required");
      return;
    }

    await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        student,
        odbiorca,
        tresc,
      }),
    }).then((resp) => resp.json());
    setStudent("");
    setReipent("");
    setBody("");
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  };

  const StudentSelect = ({ label, description, value, onChange, students }) => {
    return (
      <div>
        <label>{label}</label>
        <select value={value} onChange={onChange} required>
          <option value="" disabled>
            {description}
          </option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.imie} {s.nazwisko}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <React.Fragment>
      <H2>Wyślij nową wiadomość</H2>
      <form className={formStyle}>
        <StudentSelect
          label="Student "
          description="Wybierz studenta"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          students={students}
        />
        <TextInput
          label="Odbiorca"
          description="Wpisz odbiorcę"
          onChange={(e) => setReipent(e.target.value)}
          value={odbiorca}
          required
        />
        <TextArea
          label="Wiadomość"
          description="Napisz swoją wiadomość..."
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          value={tresc}
          required
        />
        <FormFooter
          primaryButton={{
            text: "Wyślij",
            onClick: handleSubmit,
          }}
        />
      </form>

      <Toast
        variant="success"
        title="Wiadomość wysłana"
        body="Twoja wiadomość została wysłana."
        open={toastOpen}
        close={() => setToastOpen(false)}
      />
    </React.Fragment>
  );
}

