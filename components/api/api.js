import axios from "axios";
import { Base_url } from "../../utils/global";
import { headerConfig } from "../../utils/config";

export const getDailyAttendance = async(id,datestring)=>{
    const url = Base_url + `dateReport`;
  
    try {
      const response = await axios.post(url, {
        device_location_id: id,
        date: datestring
      });
      console.log(response)
      return response.data.result;
    } catch (error) {
      return null
    }
  }

  export const getSelectedAttendance = async(id,start,end)=>{
    const url = Base_url + `dateRangeReport`;
  
    try {
      const response = await axios.post(url, {
        device_location_id: id,
        start: start,
        end: end
      });
      console.log(response)
      return response.data.result;
    } catch (error) {
      return null
    }
  }

  export const getallUsers = () => {
    const url = Base_url + `getallRfidUsersByDeviceLocation`;
    try {
      
      headerConfig().then(result=>{
        axios.get(url, result).then(data=>{
          return data.data.count;
        })        
      })
      
    } catch (error) {
      return false;
    }
  };
  
  export const getpresent = async () => {
    const url = Base_url + `getPresentRfidUsersByDeviceLocation`;
    try {
      const response = await axios.get(url, headerConfig());
      return response.data.result;
    } catch (error) {
      return null;
    }
  };
  
  export const getChartValue = async () => {
    const url = Base_url + `presentMonthRatioByDeviceLocation`;
    try {
      const response = await axios.get(url, headerConfig());
      console.log("rerer", response);
      return response.data;
    } catch (error) {
      return null;
    }
  };
  