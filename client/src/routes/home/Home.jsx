import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserRequestAction } from "../../reducers/user";

const Home = (props) => {
    const { userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userToken) {
            dispatch(loadUserRequestAction(userToken));
        }
    }, [userToken]);

    return <h1>메인</h1>;
};

export default Home;
