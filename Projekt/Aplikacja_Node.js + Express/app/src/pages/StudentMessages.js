import React, {useState, useEffect} from "react";
import { H2 } from "@leafygreen-ui/typography";
import MessageSummary from "../components/MessageSummary";
import { baseUrl } from "../config";
import { useParams } from "react-router-dom";

export default function App() {
  let [messages, setMessages] = useState([]);
  let params = useParams();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let results = await fetch(`${baseUrl}/posts/messagesByStudent/${params.id}`).then(resp => resp.json());
        console.log(results);
        
        if (Array.isArray(results)) {
          setMessages(results);
        } else {
          console.error("API did not return an array:", results);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  
    loadMessages();
  }, []);

  return (
    <React.Fragment>
      <H2>Wiadomości od studenta {params.id}</H2>
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