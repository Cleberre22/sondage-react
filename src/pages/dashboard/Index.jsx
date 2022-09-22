import React from 'react';
import MenuHeader from "../../components/auth/MenuHeader";
import DropDownPoll from "../../components/dashboard/DropDownPoll";


const index = () => {
    return (
        <div>
            <MenuHeader />
            <h1>DASHBOARD</h1>
            <DropDownPoll />

        </div>
    );
};

export default index;
