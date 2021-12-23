import React, { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let tempUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(tempUser);
  }, []);

  if (user) {
    return user;
  }
};

export default useAuth;
