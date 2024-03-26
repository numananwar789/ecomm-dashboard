import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  let Cmp = props.Cmp;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Cmp />
    </div>
  );
}

export default Protected;
