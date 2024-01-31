import React, {useState, useEffect} from "react";
import { H2 } from "@leafygreen-ui/typography";
import StudentsList from "../components/StudentsList";
import { baseUrl } from "../config";

export default function App() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      let results = await fetch(`${baseUrl}/posts/students1`).then(resp => resp.json());
      setStudents(results);
    }
    loadMessages();
    console.log(students)
  }, []);

  return (
    <React.Fragment>
      <H2>Studenci</H2>
      <div>
        {students.map(student => {
          return(
            <StudentsList {...student} key={student._id} />
          )
        })}
      </div>
    </React.Fragment>
  )
}