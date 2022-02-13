import React from "react";
import usersSlice from "../Redux/usersSlice";
import axios from "axios";

const FormData = async (newData, data, date) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let result = data.filter((time) => time.user_id === user._id);
  const duplicate = result.map((item) => {
    if (item.updatedAt.substr(0, 10) === date) {
      return item;
    }
  });
  let tempArr = duplicate.slice(-1);
  if (tempArr.includes("undefined")) {
    //update with newData props
  } else {
    let newTime = tempArr[0].time + newData.time;
    try {
      const response = await axios.delete("/api/timer/" + tempArr[0]._id);
      if (response.statusText === "OK") {
        try {
          const timersResult = await axios.post("/api/timer/", {
            time: newTime,
            user_id: newData.user_id,
            name: newData.name,
          });
        } catch (error) {
          console.log("error: ", error.message);
        }
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  }
  return <div>formdata</div>;
};

export default FormData;
