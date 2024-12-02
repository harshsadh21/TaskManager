// import React from "react";
import { useEffect } from "react";
import Notes from "./Notes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// import Alert from "./Alert";

const Home = () => {
  const token = Cookies.get("token");
  const navi = useNavigate();
  useEffect(() => {
    if (!token) {
      navi("/login");
    }
  }, []);

  return (
    <div>
      <Notes />
    </div>
  );
};

export default Home;
