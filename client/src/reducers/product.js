const cartListFromStorage = localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

export const initialState = {
    productLoading: false, // 상품 리스트 가져오기 시도 중
    productDone: false,
    productError: null,
    productList: null,

    productDetailLoading: false, // 해당 상품 정보 가져오기 시도 중
    productDetailDone: false,
    productDetailError: null,
    productInfo: null,

    cartList: cartListFromStorage, // 장바구니 정보

    cartListLoading: false, // 장바구니 리스트 가져오기 시도중
    cartListDone: false,
    cartListError: null,

    cartAddLoading: false, // 장바구니 담기 시도중
    cartAddDone: false,
    cartAddError: null,

    cartRemoveLoading: false, // 장바구니 상품 삭제 시도중
    cartRemoveDone: false,
    cartRemoveError: null,

    productCreateLoading: false, // 관리자 상품 등록
    productCreateDone: false,
    productCreateError: null,

    categoryList: null, // 카테고리 정보
    categoryListLoading: false, // 카테고리 리스트 가져오기 시도중
    categoryListDone: false,
    categoryListError: null,

    categoryCreateLoading: false, // 관리자 카테고리 등록
    categoryCreateDone: false,
    categoryCreateError: null,

    paymentProducts: null, // 결제상품 리스트
    paymentProductsLoading: false, // 결제 상품 요청 시도중
    paymentProductsDone: false,
    paymentProductsError: null,
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";

export const PRODUCT_SEARCH_REQUEST = "PRODUCT_SEARCH_REQUEST";
export const PRODUCT_SEARCH_SUCCESS = "PRODUCT_SEARCH_SUCCESS";
export const PRODUCT_SEARCH_FAILURE = "PRODUCT_SEARCH_FAILURE";

export const CART_ADD_REQUEST = "CART_ADD_REQUEST";
export const CART_ADD_SUCCESS = "CART_ADD_SUCCESS";
export const CART_ADD_FAILURE = "CART_ADD_FAILURE";

export const CART_LIST_REQUEST = "CART_LIST_REQUEST";
export const CART_LIST_SUCCESS = "CART_LIST_SUCCESS";
export const CART_LIST_FAILURE = "CART_LIST_FAILURE";

export const CART_REMOVE_REQUEST = "CART_REMOVE_REQUEST";
export const CART_REMOVE_SUCCESS = "CART_REMOVE_SUCCESS";
export const CART_REMOVE_FAILURE = "CART_REMOVE_FAILURE";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE";

export const CATEGORY_CREATE_REQUEST = "CATEGORY_CREATE_REQUEST";
export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
export const CATEGORY_CREATE_FAILURE = "CATEGORY_CREATE_FAILURE";

export const CATEGORY_LIST_REQUEST = "CATEGORY_LIST_REQUEST";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILURE = "CATEGORY_LIST_FAILURE";

export const PAYMENT_PRODUCTS_REQUEST = "PAYMENT_PRODUCTS_REQUEST";
export const PAYMENT_PRODUCTS_SUCCESS = "PAYMENT_PRODUCTS_SUCCESS";
export const PAYMENT_PRODUCTS_FAILURE = "PAYMENT_PRODUCTS_FAILURE";

export const paymentProductsRequest = (products) => {
    return {
        type: PAYMENT_PRODUCTS_REQUEST,
        products,
    };
};

export const productListRequest = (category = "", keyword = "") => {
    const data = { category, keyword };
    return {
        type: PRODUCT_LIST_REQUEST,
        data,
    };
};

export const productDetailRequest = (id) => {
    return {
        type: PRODUCT_DETAIL_REQUEST,
        id,
    };
};

export const addToCartRequest = (id = "", quantity = "") => {
    const data = { id, quantity };
    return {
        type: CART_ADD_REQUEST,
        data,
    };
};

export const cartListRequest = () => {
    return {
        type: CART_LIST_REQUEST,
    };
};

export const productCreateRequest = (
    name,
    categoryId,
    stock,
    price,
    images,
    description
) => {
    const data = { name, categoryId, stock, price, images, description };
    console.log(data);
    return {
        type: PRODUCT_CREATE_REQUEST,
        data,
    };
};

export const removeFromCartRequest = (id) => {
    return {
        type: CART_REMOVE_REQUEST,
        id,
    };
};

export const categoryCreateRequest = (category) => {
    return {
        type: CATEGORY_CREATE_REQUEST,
        category,
    };
};

export const categoryListRequest = (category) => {
    return {
        type: CATEGORY_LIST_REQUEST,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 상품 리스트
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                productLoading: true,
                productDone: false,
                productError: null,
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productLoading: false,
                productDone: true,
                productList: action.payload,
            };
        case PRODUCT_LIST_FAILURE:
            return {
                ...state,
                productLoading: false,
                productError: action.payload,
            };

        // 상품 정보
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                productDetailLoading: true,
                productDetailDone: false,
                productDetailError: null,
            };

        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetailLoading: false,
                productDetailDone: true,
                productInfo: action.payload,
            };
        case PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                productDetailLoading: false,
                productDetailError: action.payload,
            };

        // 상품 등록
        case PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                productCreateLoading: true,
                productCreateDone: false,
                productCreateError: null,
            };
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                productCreateLoading: false,
                productCreateDone: true,
            };
        case PRODUCT_CREATE_FAILURE:
            return {
                ...state,
                productCreateLoading: false,
                productCreateError: action.payload,
            };

        // 장바구니 등록
        case CART_ADD_REQUEST:
            return {
                ...state,
                cartAddLoading: true,
                cartAddDone: false,
                cartAddError: null,
            };
        case CART_ADD_SUCCESS:
            const cartItem = action.payload;
            const existItem = state.cartList.find((c) => c.id === cartItem.id);

            // 장바구니에 같은 상품이 있다면
            if (existItem) {
                return {
                    ...state,
                    cartAddlLoading: false,
                    cartAddlDone: true,
                    cartList: state.cartList.map((c) =>
                        c.id === existItem.id ? cartItem : c
                    ),
                };
            } else {
                return {
                    ...state,
                    cartAddlLoading: false,
                    cartAddlDone: true,
                    cartList: [cartItem, ...state.cartList],
                };
            }
        case CART_ADD_FAILURE:
            return {
                ...state,
                cartAddLoading: false,
                cartAddError: action.payload,
            };

        // 장바구니 리스트
        case CART_LIST_REQUEST:
            return {
                ...state,
                cartListLoading: true,
                cartListDone: false,
                cartListError: null,
            };
        case CART_LIST_SUCCESS:
            return {
                ...state,
                cartListlLoading: false,
                cartListlDone: true,
                cartList: action.payload,
            };
        case CART_LIST_FAILURE:
            return {
                ...state,
                cartListLoading: false,
                cartListError: action.payload,
            };

        // 장바구니 삭제
        case CART_REMOVE_REQUEST:
            return {
                ...state,
                cartRemoveLoading: true,
                cartRemoveDone: false,
                cartRemoveError: null,
            };

        case CART_REMOVE_SUCCESS:
            return {
                ...state,
                cartRemoveLoading: false,
                cartRemoveDone: true,
                cartList: action.payload,
            };
        case CART_REMOVE_FAILURE:
            return {
                ...state,
                cartRemoveLoading: false,
                cartRemoveError: action.payload,
            };

        // 카테고리 등록
        case CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                categoryCreateLoading: true,
                categoryCreateDone: false,
                categoryCreateError: null,
            };
        case CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                categoryCreateLoading: false,
                categoryCreateDone: true,
            };
        case CATEGORY_CREATE_FAILURE:
            return {
                ...state,
                categoryCreateLoading: false,
                categoryCreateError: action.payload,
            };

        // 카테고리 리스트
        case CATEGORY_LIST_REQUEST:
            return {
                ...state,
                categoryListLoading: true,
                categoryListDone: false,
                categoryListError: null,
            };
        case CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                categoryListlLoading: false,
                categoryListlDone: true,
                categoryList: action.payload,
            };
        case CATEGORY_LIST_FAILURE:
            return {
                ...state,
                categoryListLoading: false,
                categoryListError: action.payload,
            };

        case PAYMENT_PRODUCTS_REQUEST:
            return {
                ...state,
                paymentProductsLoading: true,
                paymentProductsDone: false,
                paymentProductsError: null,
            };
        case PAYMENT_PRODUCTS_SUCCESS:
            return {
                ...state,
                paymentProductslLoading: false,
                paymentProductslDone: true,
                paymentProducts: action.payload,
            };
        case PAYMENT_PRODUCTS_FAILURE:
            return {
                ...state,
                paymentProductsLoading: false,
                paymentProductsError: action.payload,
            };

        default:
            return state;
    }
};

export const actionCreators = {
    productListRequest,
    productDetailRequest,
    productCreateRequest,
    addToCartRequest,
    cartListRequest,
    removeFromCartRequest,
    categoryCreateRequest,
    categoryListRequest,
    paymentProductsRequest,
};

export default reducer;
