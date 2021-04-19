import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "./categoryCreate.module.css";
import {
    categoryCreateRequest,
    categoryListRequest,
} from "../../reducers/product";

const CategoryCreate = ({ history }) => {
    const type = "category";
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.user);
    const { categoryList } = useSelector((state) => state.product);
    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
            return;
        }
        if (!userInfo.isAdmin) {
            history.push("/");
            return;
        }
        dispatch(categoryListRequest(type));
    }, [userInfo, type]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(categoryCreateRequest(category));
        e.target.reset();
    });

    const onChangeCategory = useCallback((e) => {
        setCategory(e.target.value);
    });
    console.log(categoryList);
    return (
        <>
            <div className={styled.page_box}>
                <div className={styled.page_name}>Category Register</div>
                <div className={styled.category_create_form}>
                    <form className={styled.form} onSubmit={onSubmit}>
                        <table className={styled.table}>
                            <tr>
                                <th>카테고리명</th>
                                <td>
                                    <input
                                        type="text"
                                        className={styled.input_text}
                                        onChange={onChangeCategory}
                                        required
                                    />
                                </td>
                            </tr>
                        </table>
                        <button className={styled.btn}>CREATE</button>
                    </form>
                </div>
            </div>
            <div className={styled.page_box}>
                <div className={styled.page_name}>Category List</div>
                <table className={styled.list_table}>
                    <thead></thead>
                    <tbody>
                        {categoryList &&
                            categoryList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CategoryCreate;
