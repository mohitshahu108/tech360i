import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
        error: "",
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        error: payload,
      };
    default:
      return state;
  }
};

 export const productDetailReducer = (
  state = { product: {}, loading: true },
  {type, payload}
) => {
  switch(type){
    case PRODUCT_DETAILS_REQUEST: return{
      loading: true
      }
    case PRODUCT_DETAILS_SUCCESS: return{
      loading: false,
      product: payload
    }
    case PRODUCT_DETAILS_FAIL: return{
      loading: false,
      product: [],
      error: payload
    }
    default: return state
  }
};
