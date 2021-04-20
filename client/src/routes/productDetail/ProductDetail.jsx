import React, { useCallback, useEffect, useState } from "react";
import styled from "./productDetail.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    productDetailRequest,
    paymentProductsRequest,
} from "../../reducers/product";

const ProductDetail = ({ match, history }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const id = match.params.id;
    const { productInfo } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(productDetailRequest(id));
    }, [id]);

    const onClickAddToCart = useCallback(() => {
        history.push(`/cart/${id}?quantity=${quantity}`);
    }, []);

    const onClickPaymentProducts = useCallback(() => {
        dispatch(paymentProductsRequest([productInfo]));
        history.push("/payment");
    });

    return (
        <>
            {productInfo && (
                <div className={styled.productDetail}>
                    <div className={styled.productDetailHeader}>
                        <div className={styled.productDetailImg}>
                            <img src={productInfo.src} alt="name" />
                        </div>

                        <div className={styled.productSummary}>
                            <div className={styled.productName}>
                                {productInfo.name}
                            </div>
                            <div className={styled.productPrice}>
                                {productInfo.price}
                            </div>
                            <div className={styled.productQuantity}>
                                <div>수량</div>
                                <select
                                    className={styled.productSelect}
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <button
                                className={styled.btn}
                                onClick={onClickAddToCart}
                            >
                                ADD TO CART
                            </button>

                            <button
                                className={styled.btn}
                                onClick={onClickPaymentProducts}
                            >
                                BUY NOW
                            </button>
                        </div>
                    </div>
                    <div className={styled.productDescription}>
                        <p>{productInfo.description}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
