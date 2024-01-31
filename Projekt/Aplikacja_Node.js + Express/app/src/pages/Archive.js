import React, {useState, useEffect} from "react";
import { H2 } from "@leafygreen-ui/typography";
import MessageSummary from "../components/MessageSummary";
import { baseUrl } from "../config";

export default function App() {

  let [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      let results = await fetch(`${baseUrl}/posts/`).then(resp => resp.json());
      setPosts(results);
    }

    loadPosts();
  }, []);

  return (
    <React.Fragment>
      <H2>All Articles</H2>
      <div>
        {posts.map(post => {
          return(
            <MessageSummary {...post} key={post._id} />
          )
        })}
      </div>
    </React.Fragment>
  )
}