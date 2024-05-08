// // GoPayFast.js

// import axios from 'axios';

// const GoPayFast = {
//   baseURL: 'https://sandbox.gopayfast.com/eng/',
//   merchantId: 102,
//   merchantKey: 'zWHjBp2AlttNu1sK',

//   createPayment: async (data) => {
//     try {
//       const response = await axios.post(`${GoPayFast.baseURL}gateway/create_payment`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//           MerchantID: GoPayFast.merchantId,
//           MerchantKey: GoPayFast.merchantKey,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to create payment: ' + error.message);
//     }
//   },
// };

// export default GoPayFast;



import axios from 'axios';

const BASE_URL = 'https://sandbox.gopayfast.com/';

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPayment = async (data) => {
  try {
    const response = await apiService.post('/createPayment', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const verifyPayment = async (data) => {
  try {
    const response = await apiService.post('/verifyPayment', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default apiService;