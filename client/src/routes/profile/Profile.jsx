import React, { useState, useCallback } from "react";
import styled from "./profile.module.css";

const Profile = (props) => {
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (password !== passwordCheck) {
                return setPasswordError(true);
            }
            console.log(password, name, phone, address);
        },
        [password, passwordCheck, name, phone, address]
    );

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
    }, []);

    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    }, []);

    const onChangeAddress = useCallback((e) => {
        setAddress(e.target.value);
    });

    const nameValue = "현정";
    const phoneValue = "01037944084";
    const addressValue = "경기 수원시 연무동";

    return (
        <>
            <div className={styled.page_name}>Profile</div>
            <form onSubmit={onSubmit} className={styled.form}>
                <div className={styled.form_item}>
                    <input type="text" value="010_cm@naver.com" readOnly />
                </div>
                <div className={styled.form_item}>
                    <input
                        type="text"
                        onChange={onChangeName}
                        defaultValue={nameValue}
                        required
                    />
                </div>
                <div className={styled.form_item}>
                    <input
                        type="password"
                        onChange={onChangePassword}
                        placeholder="비밀번호를 입력하세요."
                        required
                    />
                </div>
                <div className={styled.form_item}>
                    <input
                        type="password"
                        onChange={onChangePasswordCheck}
                        placeholder="비밀번호 확인"
                        required
                    />
                </div>
                {passwordError && (
                    <div style={{ color: "red" }}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}
                <div className={styled.form_item}>
                    <input
                        type="text"
                        onChange={onChangePhone}
                        defaultValue={phoneValue ? phoneValue : ""}
                        placeholder="-없이 연락처를 입력하세요."
                        required
                    />
                </div>
                <div className={styled.form_item}>
                    <input
                        type="text"
                        onChange={onChangeAddress}
                        defaultValue={addressValue ? addressValue : ""}
                        placeholder="주소를 입력하세요."
                        required
                    />
                </div>

                <div className={styled.form_item}>
                    <button className={styled.update_btn}>UPDATE</button>
                </div>
            </form>
        </>
    );
};

export default Profile;
