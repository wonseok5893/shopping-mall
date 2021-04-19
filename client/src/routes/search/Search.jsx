import React, { useCallback, useRef, useState } from "react";
import styled from "./search.module.css";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            history.push(`/shop/search/${keyword}`);
        },
        [keyword]
    );

    const onChangeKeyword = useCallback((e) => {
        setKeyword(e.target.value);
    }, []);

    return (
        <>
            <div className={styled.page_name}>Product Search</div>
            <form onSubmit={onSubmit} className={styled.form}>
                <input
                    placeholder="제품을 검색하세요..."
                    className={styled.input}
                    onChange={onChangeKeyword}
                />
                <button className={styled.btn}>SEARCH</button>
            </form>
        </>
    );
};

export default Search;
