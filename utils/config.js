import { Base_url } from "./global";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export const login = async (data) => {
  const url = Base_url + `login`;
  try {
    const response = await axios.post(url, data);
    if (response.data.auth[0].token !== undefined) {
    await AsyncStorage.setItem('token', response.data.auth[0].token);
    await AsyncStorage.setItem('organization_id', response.data.auth[0].organization_id+'');
    await AsyncStorage.setItem('branch_id', response.data.auth[0].branch_id+'');
    
      await AsyncStorage.setItem(
        "device_location_id",
        response.data.auth[0].device_location_id+''
      );
      await AsyncStorage.setItem("role", response.data.auth[0].user_role+'');
      await AsyncStorage.setItem("userId", response.data.auth[0].id+'');
      await AsyncStorage.setItem(
        "device_name",
        response.data.device_name[0].device_name
      );
      return response.data.auth[0];
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const tokenValidate = async () => {
  const getToken = await AsyncStorage.getItem("token");
  if (getToken === null) {
    return false;
  } else {
    const url = Base_url + `tokenValidate`;
    const token = AsyncStorage.getItem("token");
    const user_id = AsyncStorage.getItem("userId");
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

export const headerConfig = async() => {
  if (!tokenValidate) {
    return null;
  }
  const data = {
    headers: {
      Authorization: await AsyncStorage.getItem("token"),
      organization_id: await AsyncStorage.getItem("organization_id"),
      branch_id: await AsyncStorage.getItem("branch_id"),
      role: await AsyncStorage.getItem("role"),
      userId: await AsyncStorage.getItem("userId"),
      device_location_id: await AsyncStorage.getItem("device_location_id"),
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
