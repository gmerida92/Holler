//Type Key String Literals
const LOAD_USER = '/api/getUser';


//Redux action creators
const loadUser = (payload) => {
    return {
        type: LOAD_USER,
        payload
    }
}


//Thunk action creators

// Get User based by Id
export const loadUserDetail = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);

    if (response?.ok) {

        const user = await response?.json();
        dispatch(loadUser(user));
        return response;

    } else if (response?.status < 500) {

        const data = await response?.json();
        if (data?.errors) {
            return data?.errors;
        }

    } else {

        return ['An error occurred. Please try again.'];

    }
}


//Initial State Object
const initialState = {};


//Redux Reducer
const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER:
            newState = {};

            newState[action.payload.id] = { ...action.payload };
            return newState;

        default:
            return state;
    }
}

export default userReducer;