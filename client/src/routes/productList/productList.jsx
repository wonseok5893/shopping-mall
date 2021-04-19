import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "./productList.module.css";
import { productListRequest } from "../../reducers/product";

const ProductList = ({ history, match }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { productList } = useSelector((state) => state.product);
    const [category, setCategory] = useState("");

    const onChangeSelect = useCallback((e) => {
        setCategory(e.target.value);
    });

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
            return;
        }
        if (!userInfo.isAdmin) {
            history.push("/");
        }
        dispatch(productListRequest(category));
    }, [userInfo]);

    return (
        <>
            <div className={styled.page_name}>Product List</div>
            <div className={styled.product_management}>
                <div className={styled.product_list}>
                    <table className={styled.table}>
                        <thead>
                            <th>
                                <select onChange={onChangeSelect}>
                                    <option value="">all</option>
                                    <option value="outer">OUTER</option>
                                    <option value="top">TOP</option>
                                    <option value="pants">PANTS</option>
                                    <option value="skirt">SKIRT</option>
                                </select>
                            </th>
                            <th>상품명</th>
                            <th>상품사진</th>
                            <th>재고수량</th>
                            <th>가격</th>
                            <th className={styled.last_th}>수정/삭제</th>
                        </thead>
                        <tbody>
                            {productList &&
                                productList.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.category}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            <img src={product.src} />
                                        </td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td className={styled.last_td}>
                                            <button>수정</button>
                                            <button>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ProductList;
