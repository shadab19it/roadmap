export interface InitialState {
  user: any;
}
export interface action {
  type: string;
  payload: any;
}

export const initialState: InitialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (userState: InitialState, action: action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...userState,
        user: action.payload.userId,
      };

    default:
      return userState;
  }
};

export default reducer;
