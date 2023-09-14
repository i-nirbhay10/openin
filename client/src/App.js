import Signin from "./Signin";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Logout from "./Logout";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/Signup" element={<SignUp />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route
          path="*"
          element={
            <div>
              <h1>erorr 404 this page is not exist!</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
