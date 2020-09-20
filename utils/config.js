import { Base_url } from "./global";
import axios from "axios";

export const login = async (data) => {
  const url = Base_url + `login`;
  // console.log("holudia pakhi")
  // const response = await axios.post(url, data);
  // console.log(response);
  try {
    const response = await axios.post(url, data);
    console.log(response.data.auth[0].token, response);
    if (response.data.auth[0].token !== undefined) {
      localStorage.setItem("token", response.data.auth[0].token);
      localStorage.setItem(
        "organization_id",
        response.data.auth[0].organization_id
      );
      localStorage.setItem("branch_id", response.data.auth[0].branch_id);
      localStorage.setItem(
        "device_location_id",
        response.data.auth[0].device_location_id
      );
      localStorage.setItem("role", response.data.auth[0].user_role);
      localStorage.setItem("userId", response.data.auth[0].id);
      localStorage.setItem(
        "device_name",
        response.data.device_name[0].device_name
      );
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
};

export const tokenValidate = async () => {
  const getToken = await localStorage.getItem("token");
  if (getToken === null) {
    return false;
  } else {
    const url = Base_url + `tokenValidate`;
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("userId");
    const data = {
      token: token,
      id: user_id,
    };
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      return false;
    }
  }
};

export const headerConfig = () => {
  if (!tokenValidate) {
    return null;
  }
  const data = {
    headers: {
      Authorization: localStorage.getItem("token"),
      organization_id: localStorage.getItem("organization_id"),
      branch_id: localStorage.getItem("branch_id"),
      role: localStorage.getItem("role"),
      userId: localStorage.getItem("userId"),
      device_location_id: localStorage.getItem("device_location_id"),
    },
  };
  return data;
};

export const parsingServerDate = (mainData) => {
  let output = [];

  mainData.forEach(function (item) {
    var existing = output.filter(function (v, i) {
      return v.rfid_user_name === item.rfid_user_name;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].created_at = output[
        existingIndex
      ].created_at.concat(item.created_at);
    } else {
      if (typeof item.created_at == "string")
        item.created_at = [item.created_at];
      output.push(item);
    }
  });
  return output;
};
