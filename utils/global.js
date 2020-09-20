import { ToastContainer, toast } from "react-toastify";

import React from "react";
// export const Base_url = "http://103.129.239.20:5000/"; // dev server
export const Base_url = "http://139.162.14.41:5000/"; // stage server

export const DatePipe = (date) => {
  if (date == null) {
    return null;
  }
  const tempDate = new Date(date).toString().split(" ");

  const formattedDate = `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}`;
  return formattedDate;
};

export const BackDatePipe = (date) => {
  let start = new Date(date).toLocaleDateString().split("/");
  const startD = `${start[2]}-${start[0].padStart(2, "0")}-${start[1].padStart(
    2,
    "0"
  )}`;

  return startD;
};

export const TimePipe = (date, time) => {
  if (date == null || time == null) {
    return null;
  } else {
    let start = new Date(`${date} ${time}`).toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
    });
    return start;
  }
};

export const toastDesign = (data) => {
  toast.warn(data, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastSpace = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
};

export const DateArray = (days) => {
  var aryDates = [];

  for (let i = 0; i <= days; i++) {
    const date = new Date();
    let last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

    last.setDate(last.getDate() + i);
    aryDates.push(
      last.getDate() + "-" + (last.getMonth() + 1) + "-" + last.getFullYear()
    );
  }
  return aryDates;
};
