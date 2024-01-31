import React, { useState} from "react";
import { H2 } from "@leafygreen-ui/typography";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import Button from "@leafygreen-ui/button";
import TextInput from "@leafygreen-ui/text-input";
import { baseUrl } from "../config";

export default function App() {
  let [messageId, setMessageId] = useState("");
  let [studentData, setStudentData] = useState({});
  let [showModal, setShowModal] = useState(false);

  const getStudentData = async () => {
    try {
      const result = await fetch(`${baseUrl}/posts/message/student/${messageId}`).then((resp) => resp.json());
      setStudentData(result.student);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching student data:", error.message);
    }
  };

  return (
    <React.Fragment>
      <H2>Szukaj studenta po ID wiadomości</H2>
      <TextInput
        label="ID Wiadomości"
        onChange={(e) => setMessageId(e.target.value)}
        value={messageId}
      />
      <br />
      <Button variant="primary" onClick={getStudentData}>
        Pokaż dane studenta
      </Button>

      <ConfirmationModal title="" open={showModal} buttonText="Close" onCancel={() => setShowModal(false)}>
        <H2>Dane Studenta</H2>
        <p>ID studenta: {studentData._id}</p>
        <p>Imie: {studentData.imie}</p>
        <p>Nazwisko: {studentData.nazwisko}</p>
      </ConfirmationModal>
    </React.Fragment>
  );
}
