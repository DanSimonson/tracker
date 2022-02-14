import React from "react";
import RegisterForm from "../Components/Register/RegisterForm";
function RegisterPage(props) {
  console.log("props: ", props);
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
