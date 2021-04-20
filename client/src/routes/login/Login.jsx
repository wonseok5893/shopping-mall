import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequestAction } from "../../reducers/user";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./login.module.css";

const LogIn = ({ history, location }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logInLoading, userToken } = useSelector((state) => state.user);

    // 이미 로그인되어 있다면
    useEffect(() => {
        if (userToken) {
            history.replace("/");
        }
    }, [userToken, history, location]);

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(loginRequestAction({ email, password }));
        },
        [email, password]
    );

    return (
        <>
            <div className={styled.page_name}>LOG-IN</div>
            <div className={styled.product_create_form}>
                <form onSubmit={onSubmit} className={styled.form}>
                    <div className={styled.form_item}>
                        <input
                            type="email"
                            placeholder="e-mail"
                            onChange={onChangeEmail}
                            required
                        />
                    </div>
                    <div className={styled.form_item}>
                        <input
                            type="password"
                            placeholder="password"
                            onChange={onChangePassword}
                            required
                        />
                    </div>
                    <div className={styled.form_item}>
                        <button className={styled.login_btn}>
                            {logInLoading ? (
                                <div className="fa-2x">
                                    <FontAwesomeIcon icon={faSpinner} pulse />
                                </div>
                            ) : (
                                "CONNECT"
                            )}
                        </button>
                    </div>
                </form>
                <div className={styled.transform_text}>
                    아직 계정이 없나요?{" "}
                    <Link to="/register" className={styled.transform}>
                        JOIN US
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LogIn;
