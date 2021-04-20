import React, { useState } from "react";
import styled from "styled-components";
import RightNav from "./rightNav2";

const NavBox = ({ open }) => {
    return (
        <>
            <RightNav open={open} />
        </>
    );
};

export default NavBox;
