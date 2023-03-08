// //Type Key String Literals
// const CREATE_IMAGE_BY_BUSINESS = "/api/createImageByBusiness"

// //Redux action creators
// const createImageForBusiness = (payload) => {
//     return {
//         type: CREATE_IMAGE_BY_BUSINESS,
//         payload
//     }
// }

// //Thunk action creators

// // Create Image to a Business based on the Business Id
// export const createNewImageForBusiness = (id, file) => async (dispatch) => {
//     const response = await fetch(`/api/images/businesses/${id}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: file
//     })


// }

// //Initial State Object
// const initialState = {};

// //Redux Reducer