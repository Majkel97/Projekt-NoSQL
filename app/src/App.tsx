import "./styles.css";
import "./fonts.css";

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";
import CreateMessage from "./pages/Create_message";
import CreateStudent from "./pages/Create_student";
import StudentMessages from "./pages/StudentMessages";
import FindStudentByMsgId from "./pages/FindStudentByMsgId";
import Post from "./pages/Post";


function App() {
  return (
    <LeafygreenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-message" element={<CreateMessage />} />
            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/students" element={<Students />} />
            <Route path="/messagesByStudent/:id" element={<StudentMessages />} />
            <Route path="/message/student/:id" element={<FindStudentByMsgId />} />
          </Route>
        </Routes>
      </Router>
    </LeafygreenProvider>
  );
}

export default App;