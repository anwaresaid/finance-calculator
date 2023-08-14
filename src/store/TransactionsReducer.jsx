import {
  DELETE_ITEM,
  ADD_INCOME,
  ADD_EXPENSE,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_FAIL,
  FETCH_CURRENCIES_SUCCESS,
  SET_SELECTED_CURRENCY,
  EXCHANGE_CURRENCY,
  TOGGLE_FORM_VALIDATION,
} from "./Constants";
const initialState = {
  transactions: [],
  exchangedSum: 0,
  currencies: [],
  selectedCurrency: {},
  baseCurrency: {},
  formValidation: false,
};

//it's not ideal to use fetching currency data in the same file as the transactions reducer, but since it's small project I did
const reducer = (state = initialState, action) => {
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
    case EXCHANGE_CURRENCY: {
      return {
        ...state,
        transactions: [...state.transactions],
        exchangedSum: action.payload,
      };
    }
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
    default:
      return state;
  }
};
export default reducer;
