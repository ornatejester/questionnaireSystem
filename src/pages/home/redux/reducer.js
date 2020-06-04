const initialState = {
  isSiderbarOpen: false,
  localLanguage: {
    value: "zh",
    code: "CN",
  },
};

const SET_SIDERBAR_STATUS = "SET_SIDERBAR_STATUS";
const SET_LOCALLANGUAGE = "SET_LOCALLANGUAGE";

export const setSiderbarStatus = () => {
  return {
    type: SET_SIDERBAR_STATUS,
  };
};

export const setLocalLanguage = localLanguage => {
  return {
    type:SET_LOCALLANGUAGE,
    localLanguage
  }
}

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDERBAR_STATUS:
      return {
        ...state,
        isSiderbarOpen: !state.isSiderbarOpen,
      };
    case SET_LOCALLANGUAGE:
      return {
        ...state,
        localLanguage: {
          ... action.localLanguage,
        },
      };
    default:
      return state;
  }
}
