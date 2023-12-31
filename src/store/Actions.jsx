import {
  DELETE_ITEM,
  ADD_INCOME,
  ADD_EXPENSE,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_FAIL,
  FETCH_CURRENCIES_SUCCESS,
  SET_SELECTED_CURRENCY,
  TOGGLE_FORM_VALIDATION,
} from "./Constants";

const access_key = "ccc968e9cef4423c00b2287debd0e1eb";

export const deleteItem = (itemId) => {
  return { type: DELETE_ITEM, payload: itemId };
};

export const addIncome = (item) => {
  return { type: ADD_INCOME, payload: item };
};
export const addExpense = (item) => ({
  type: ADD_EXPENSE,
  payload: item,
});
export const setSelectedCurrency = (currencyName) => ({
  type: SET_SELECTED_CURRENCY,
  payload: currencyName,
});
export const toggleFormValidation = () => ({
  type: TOGGLE_FORM_VALIDATION,
});
export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CURRENCIES_REQUEST,
      loading: true,
    });
    const response = await fetch(
      `http://data.fixer.io/api/latest?access_key=${access_key}`
    );
    const data = await response.json();
    dispatch({
      type: FETCH_CURRENCIES_SUCCESS,
      payload: data,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CURRENCIES_FAIL,
      payload: error,
      loading: false,
    });
  }
};
