const userTokenFromStorage = localStorage.getItem("x-auth-token")
    ? JSON.parse(localStorage.getItem("x-auth-token"))
    : null;

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const initialState = {
    // store에서 관리할 유저의 정보
    logInLoading: false, // 로그인 시도 중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃 시도 중
    logOutDone: false,
    logOutError: null,

    registerLoading: false, // 회원가입 시도 중
    registerDone: false,
    registerError: null,
    userToken: userTokenFromStorage,
    userInfo: userInfoFromStorage, // 유저 정보

    loadUserLoading: false, // 로그인 후 유저 정보 요청 시도 중
    loadUserDone: false,
    loadUserError: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    };
};

export const registerRequestAction = (data) => {
    return {
        type: REGISTER_REQUEST,
        data,
    };
};

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    };
};

export const loadUserRequestAction = (data) => {
    return {
        type: LOAD_USER_REQUEST,
        data,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 회원가입
        case REGISTER_REQUEST:
            return {
                ...state,
                registerLoading: true,
                registerDone: false,
                registerError: null,
            };
        case REGISTER_SUCCESS:
            return { ...state, registerLoading: false, registerDone: true };
        case REGISTER_FAILURE:
            return {
                ...state,
                registerLoading: false,
                registerError: action.payload,
            };

        // 로그인
        case LOG_IN_REQUEST:
            return {
                ...state,
                logInLoading: true,
                logInDone: false,
                logInError: null,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                userToken: action.payload,
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading: false,
                logInError: action.payload,
            };

        //로그아웃
        case LOG_OUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                userInfo: null,
            };
        case LOG_OUT_FAILURE:
            return {
                logOutLoading: false,
                logOutError: action.error,
            };

        // 로그인 후 유저 정보
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loadUserLoading: true,
                loadUserDone: false,
                loadUserError: null,
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loadUserLoading: false,
                loadUserDone: true,
                userInfo: action.payload,
            };
        case LOAD_USER_FAILURE:
            return {
                ...state,
                loadUserLoading: false,
                loadUserError: action.error,
            };

        default:
            return state;
    }
};

export default reducer;
