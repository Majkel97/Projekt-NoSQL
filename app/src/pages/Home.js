import React, {useState, useEffect} from "react";
import { H2 } from "@leafygreen-ui/typography";
import MessageSummary from "../components/MessageSummary";
import { baseUrl } from "../config";

export default function App() {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      let results = await fetch(`${baseUrl}/posts/`).then(resp => resp.json());
      setMessages(results);
    }

    loadMessages();
  }, []);

  return (
    <React.Fragment>
      <H2>Wiadomości</H2>
      <div>
        {messages.map(message => {
          return(
            <MessageSummary {...message} key={message._id} />
          )
        })}
      </div>
    </React.Fragment>
  )
}