import {
  DELETE_ITEM,
  ADD_INCOME,
  ADD_EXPENSE,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_FAIL,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_EXCHANGE_RATE_REQUEST,
  FETCH_EXCHANGE_RATE_FAIL,
  FETCH_EXCHANGE_RATE_SUCCESS,
  SET_SELECTED_CURRENCY,
  TOGGLE_FORM_VALIDATION,
} from "./Constants";
const initialState = {
  transactions: [],
  exchangeRates: [],
  currencies: [],
  selectedCurrency: {},
  baseCurrency: {},
  formValidation: false,
  selectedCurrencyRate: "",
};

//it's not ideal to use fetching currency data in the same file as the transactions reducer, but since it's small project I did
const reducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };
    case ADD_INCOME:
      return {
        ...state,
        transactions: [
          ...state.transactions,
          { ...action.payload, amount: Math.abs(action.payload.amount) },
        ],
      };
    case ADD_EXPENSE:
      return {
        ...state,
        transactions: [
          ...state.transactions,
          { ...action.payload, amount: -1 * Math.abs(action.payload.amount) },
        ],
      };
    case TOGGLE_FORM_VALIDATION:
      return {
        ...state,
        formValidation: !state.formValidation,
      };
    case FETCH_CURRENCIES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        currencies: Object.keys(action.payload.rates).map((key) => {
          return { key: key, value: action.payload.rates[key] };
        }),
      };
    case FETCH_CURRENCIES_FAIL:
      return { ...state, loading: false };
    case SET_SELECTED_CURRENCY:
      return {
        ...state,
        baseCurrency: state.selectedCurrency,
        selectedCurrency: action.payload,
      };
    case FETCH_EXCHANGE_RATE_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_EXCHANGE_RATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedCurrencyRate: Object.keys(action.payload.rates).map((key) => {
          return { key: key, value: action.payload.rates[key] };
        }),
      };
    }
    case FETCH_EXCHANGE_RATE_FAIL: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default reducer;
