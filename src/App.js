import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
