import { all, fork, put, takeLatest, call, select } from "redux-saga/effects";
import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILURE,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILURE,
    CART_ADD_REQUEST,
    CART_ADD_SUCCESS,
    CART_ADD_FAILURE,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_REMOVE_FAILURE,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_LIST_FAILURE,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAILURE,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAILURE,
    PAYMENT_PRODUCTS_REQUEST,
    PAYMENT_PRODUCTS_SUCCESS,
    PAYMENT_PRODUCTS_FAILURE,
} from "../reducers/product";

function productListAPI(category) {
    return [
        {
            id: 1,
            src:
                "https://image.cosstores.com/static/0/8/0/27/A1/hnm40A1270804_01_0947046_001_001_400.jpg",
            name: "텍스처드 롤 넥 베스트",
            price: "57,500원",
            description: "기모찌입니다",
            category: "top",
            stock: "99",
        },
        {
            id: 2,
            src:
                "https://image.cosstores.com/static/5/3/4/24/A1/hnm40A1244356_01_0930726_004_001_400.jpg",
            name: "플리츠 에이라인 울 캐시미어 미니 스커트",
            price: "60,000원",
            description: "기모찌입니다2",
            category: "outer",
            stock: "17",
        },
        {
            id: 3,
            src:
                "https://image.cosstores.com/static/5/2/7/20/A1/hnm40A1207257_01_0934476_001_001_400.jpg",
            name: "캐시미어 가디건",
            price: "145,000원",
            description: "기모찌입니다2",
            category: "pants",
            stock: "5",
        },
        {
            id: 4,
            src:
                "https://image.cosstores.com/static/4/7/8/26/A1/hnm40A1268741_01_0961692_003_001_400.jpg",
            name: "와이드 레그 니티드 쇼츠",
            price: "67,500원",
            description: "기모찌입니다2",
            category: "skirt",
            stock: "75",
        },
    ];
}

function* productList(action) {
    try {
        const result = yield call(productListAPI, action.category);
        yield put({
            type: PRODUCT_LIST_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: PRODUCT_LIST_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function productDetailAPI(id) {
    const list = [
        {
            id: 1,
            src:
                "https://image.cosstores.com/static/0/8/0/27/A1/hnm40A1270804_01_0947046_001_001_400.jpg",
            name: "텍스처드 롤 넥 베스트",
            price: "57,500원",
            description: "기모찌입니다",
            category: "top",
            stock: "99",
        },
        {
            id: 2,
            src:
                "https://image.cosstores.com/static/5/3/4/24/A1/hnm40A1244356_01_0930726_004_001_400.jpg",
            name: "플리츠 에이라인 울 캐시미어 미니 스커트",
            price: "60,000원",
            description: "기모찌입니다2",
            category: "outer",
            stock: "17",
        },
        {
            id: 3,
            src:
                "https://image.cosstores.com/static/5/2/7/20/A1/hnm40A1207257_01_0934476_001_001_400.jpg",
            name: "캐시미어 가디건",
            price: "145,000원",
            description: "기모찌입니다2",
            category: "pants",
            stock: "5",
        },

        {
            id: 4,
            src:
                "https://image.cosstores.com/static/4/7/8/26/A1/hnm40A1268741_01_0961692_003_001_400.jpg",
            name: "와이드 레그 니티드 쇼츠",
            price: "67,500원",
            description: "기모찌입니다2",
            category: "skirt",
            stock: "75",
        },
    ];

    return list.find((e) => e.id === Number(id));
}

function* productDetail(action) {
    try {
        const result = yield call(productDetailAPI, action.id);
        yield put({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: PRODUCT_DETAIL_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function productCreateAPI(data) {
    const formData = new FormData();
    formData.append("images", data.images);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("name", data.name);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);
    return axios.post("http://58.228.228.3/admin/product", formData, {
        headers: {
            "content-type": "multipart/form-data",
            "X-AUTH-TOKEN":
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjNAMTIzIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE2MTg1MTU2MzIsImV4cCI6MTYxODUxNzQzMn0.RxoeJPzzKIAklM9wW4Pirmn88Oea5sTWJmSRuAVd68I",
        },
    });
}

function* productCreate(action) {
    try {
        const result = yield call(productCreateAPI, action.data);

        yield put({
            type: PRODUCT_CREATE_SUCCESS,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: PRODUCT_CREATE_FAILURE,
            error: error,
        });
    }
}

function addToCartAPI(data) {
    const item = data.id;
    const list = [
        {
            id: 1,
            src:
                "https://image.cosstores.com/static/0/8/0/27/A1/hnm40A1270804_01_0947046_001_001_400.jpg",
            name: "텍스처드 롤 넥 베스트",
            price: 57500,
            description: "기모찌입니다",
            category: "top",
            stock: "99",
        },
        {
            id: 2,
            src:
                "https://image.cosstores.com/static/5/3/4/24/A1/hnm40A1244356_01_0930726_004_001_400.jpg",
            name: "플리츠 에이라인 울 캐시미어 미니 스커트",
            price: 60000,
            description: "기모찌입니다2",
            category: "outer",
            stock: "17",
        },
        {
            id: 3,
            src:
                "https://image.cosstores.com/static/5/2/7/20/A1/hnm40A1207257_01_0934476_001_001_400.jpg",
            name: "캐시미어 가디건",
            price: 145000,
            description: "기모찌입니다2",
            category: "pants",
            stock: "5",
        },

        {
            id: 4,
            src:
                "https://image.cosstores.com/static/4/7/8/26/A1/hnm40A1268741_01_0961692_003_001_400.jpg",
            name: "와이드 레그 니티드 쇼츠",
            price: 67500,
            description: "기모찌입니다2",
            category: "skirt",
            stock: "75",
        },
    ];

    return list.find((e) => e.id === Number(item));
}

function* addToCart(action) {
    try {
        const result = yield call(addToCartAPI, action.data);
        yield put({
            type: CART_ADD_SUCCESS,
            payload: {
                id: result.id,
                src: result.src,
                name: result.name,
                price: result.price,
                stock: result.stock,
                quantity: action.data.quantity,
            },
        });

        const { product } = yield select();
        const cartList = product.cartList;
        console.log(cartList);
        localStorage.setItem("cartList", JSON.stringify(cartList));
    } catch (error) {
        yield put({
            type: CART_ADD_FAILURE,
        });
    }
}

function removeFromCartAPI(id) {
    const list = [
        {
            id: 1,
            src:
                "https://image.cosstores.com/static/0/8/0/27/A1/hnm40A1270804_01_0947046_001_001_400.jpg",
            name: "텍스처드 롤 넥 베스트",
            price: 57500,
            quantity: 1,
        },
        {
            id: 2,
            src:
                "https://image.cosstores.com/static/5/3/4/24/A1/hnm40A1244356_01_0930726_004_001_400.jpg",
            name: "플리츠 에이라인 울 캐시미어 미니 스커트",
            price: 60000,
            quantity: 2,
        },
        {
            id: 3,
            src:
                "https://image.cosstores.com/static/5/2/7/20/A1/hnm40A1207257_01_0934476_001_001_400.jpg",
            name: "캐시미어 가디건",
            price: 145000,
            quantity: 1,
        },
    ];
    return list.filter((e) => e.id !== Number(id));
}

function* removeFromCart(action) {
    try {
        const result = yield call(removeFromCartAPI, action.id);
        yield put({
            type: CART_REMOVE_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: CART_REMOVE_FAILURE,
        });
    }
}

function cartListAPI() {
    return [
        {
            id: 1,
            src:
                "https://image.cosstores.com/static/0/8/0/27/A1/hnm40A1270804_01_0947046_001_001_400.jpg",
            name: "텍스처드 롤 넥 베스트",
            price: 57500,
            quantity: 1,
            description: "기모찌입니다",
            category: "top",
            stock: 99,
        },
        {
            id: 2,
            src:
                "https://image.cosstores.com/static/5/3/4/24/A1/hnm40A1244356_01_0930726_004_001_400.jpg",
            name: "플리츠 에이라인 울 캐시미어 미니 스커트",
            price: 60000,
            quantity: 2,
            description: "기모찌입니다",
            category: "outer",
            stock: 99,
        },
        {
            id: 3,
            src:
                "https://image.cosstores.com/static/5/2/7/20/A1/hnm40A1207257_01_0934476_001_001_400.jpg",
            name: "캐시미어 가디건",
            price: 145000,
            quantity: 1,
            description: "기모찌입니다",
            category: "top",
            stock: 99,
        },
    ];
}

function* cartList() {
    try {
        const result = yield call(cartListAPI);
        yield put({
            type: CART_LIST_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: CART_LIST_FAILURE,
        });
    }
}

function categoryCreateAPI(category) {
    // return axios.post("/member/signUp", category);
}

function* categoryCreate(action) {
    try {
        yield call(categoryCreateAPI, action.category);
        yield put({
            type: CATEGORY_CREATE_SUCCESS,
        });
    } catch (error) {
        yield put({
            type: CATEGORY_CREATE_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function categoryListAPI(category) {
    return [
        { id: 1, name: "OUTER" },
        { id: 2, name: "TOP" },
        { id: 3, name: "PANTS" },
        { id: 4, name: "SKIRT" },
    ];
}

function* categoryList(action) {
    try {
        const result = yield call(categoryListAPI);
        yield put({
            type: CATEGORY_LIST_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: CATEGORY_LIST_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function paymentProductsAPI(products) {
    return products;
}

function* paymentProducts(action) {
    try {
        const result = yield call(paymentProductsAPI, action.products);

        yield put({
            type: PAYMENT_PRODUCTS_SUCCESS,
            payload: result,
        });
    } catch (error) {
        yield put({
            type: PAYMENT_PRODUCTS_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function* watchProductList() {
    yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}

function* watchProductDetail() {
    yield takeLatest(PRODUCT_DETAIL_REQUEST, productDetail);
}

function* watchProductCreate() {
    yield takeLatest(PRODUCT_CREATE_REQUEST, productCreate);
}

function* watchAddToCart() {
    yield takeLatest(CART_ADD_REQUEST, addToCart);
}

function* watchCartList() {
    yield takeLatest(CART_LIST_REQUEST, cartList);
}

function* watchRemoveFromCart() {
    yield takeLatest(CART_REMOVE_REQUEST, removeFromCart);
}

function* watchCategoryCreate() {
    yield takeLatest(CATEGORY_CREATE_REQUEST, categoryCreate);
}

function* watchCategoryList() {
    yield takeLatest(CATEGORY_LIST_REQUEST, categoryList);
}

function* watchPaymentProducts() {
    yield takeLatest(PAYMENT_PRODUCTS_REQUEST, paymentProducts);
}

export default function* productSaga() {
    yield all([
        fork(watchProductList),
        fork(watchProductDetail),
        fork(watchProductCreate),
        fork(watchAddToCart),
        fork(watchRemoveFromCart),
        fork(watchCartList),
        fork(watchCategoryCreate),
        fork(watchCategoryList),
        fork(watchPaymentProducts),
    ]);
}
