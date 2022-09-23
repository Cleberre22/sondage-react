import React from "react";
import MenuHeader from "../../components/auth/MenuHeader";
import DropDownPoll from "../../components/dashboard/DropDownPoll";
import DropDownQuestion from "../../components/dashboard/DropDownQuestion";
import DropDownAnswer from "../../components/dashboard/DropDownAnswer";

const index = () => {
  return (
    <div>
      <MenuHeader />
      <h1>DASHBOARD</h1>
      <DropDownPoll />
      <DropDownQuestion />
      <DropDownAnswer />
    </div>
  );
};

export default index;
