import React, { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import TextArea from "@leafygreen-ui/text-area";
import Icon from "@leafygreen-ui/icon";
import Button from "@leafygreen-ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function App() {
  let params = useParams();
  let [post, setPost] = useState({});
  let [showModal, setShowModal] = useState(false);
  let [tresc, setTresc] = useState("");
  const navigate = useNavigate();

  const deletePost = async () => {
    await fetch(`${baseUrl}/posts/message/${params.id}`, {
      method: "DELETE"
    });
    return navigate("/");
  }

  const updateMessage = async () => {
    await fetch(`${baseUrl}/posts/message/${params.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        tresc
      })
    });

    let result = await fetch(`${baseUrl}/posts/message/${params.id}`).then(resp => resp.json());
    setPost(result);

    setTresc("");
    setShowModal(false);
  }

  useEffect(() => {
    const loadPost = async () => {
      let results = await fetch(`${baseUrl}/posts/message/${params.id}`).then(resp => resp.json());
      setPost(results);
    }

    loadPost();
  }, []);

  return (
    <React.Fragment>
      <h3>Szczegóły wiadomości:</h3>
      Wysłane przez <b>{post.student}</b> <br/>
      do <b>{post.odbiorca}</b> <br/> 
      <p>{post.tresc}</p>
      <p>Data wysłania {(new Date(post.date)).toLocaleDateString()}</p>
      <Button variant="primary" leftGlyph={<Icon glyph="Megaphone" />} onClick={() => setShowModal(true)}>Edytuj wiadomość</Button>&nbsp;&nbsp;
      <Button variant="danger" leftGlyph={<Icon glyph="Trash" />} onClick={deletePost}>Usuń wiadomość</Button>
      <br/>

      <ConfirmationModal
        open={showModal}
        buttonText="Update Message"
        onConfirm={updateMessage}
        onCancel={() => setShowModal(false)}
      >
        <H2>Update Message</H2>
        <TextArea
          label="Message"
          onChange={e => setTresc(e.target.value)}
          rows="5"
          value={tresc}
        />
      </ConfirmationModal>
    </React.Fragment>
  )
}