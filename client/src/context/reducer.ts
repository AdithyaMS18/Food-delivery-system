

type Action = 
| { type: "REGISTER_USER_SUCCESS"; payload: { user: UserData; token: string } }
| { type: "LOGIN_USER_SUCCESS"; payload: { user: UserData; token: string } }
| {type: "BEGIN"}


type UserData={
    name:string;
    _id:string;
}

type State={
    isLoading: boolean;
    user : UserData| null;
    token:string|null;
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "BEGIN":
        return {
          ...state,
          isLoading: true,
        };
      case "REGISTER_USER_SUCCESS":
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isLoading: false,
        };
      case "LOGIN_USER_SUCCESS":
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isLoading: false,
        };
      default:
        return state; // Return the current state for unsupported actions
    }
  };
  
  export default reducer;
  