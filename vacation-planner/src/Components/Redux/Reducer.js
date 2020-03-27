export const InitState = {
  isLogged: false,
  user: {
    user_Id: null,
    user_Name: null
  },
  vacations: [{ vacation_name: "New", vacation_description: "Just basic" }],
  allUsers: []
};

export const Reducer = (state = InitState, action) => {
  switch (action.type) {
    case "LOGOUT_USER":
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      return InitState;
    case "GET_VACA":
      const newarr = action.payload.map(ele => ele);
      console.log("GET_VACA_ARR", newarr);
      return {
        ...state,
        vacations: newarr
      };

    case "USER_IS_LOGGED":
      return {
        ...state,
        isLogged: action.pa,
        user: action.payload.user,
        vacations: action.payload.vacations
      };

    case "LOGIN_USER":
      console.log("USER_LOGIN", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userid", action.payload.user_id);
      localStorage.setItem("username", action.payload.user_name);
      return {
        ...state,
        isLogged: true,
        user: {
          user_Id: action.payload.user_id,
          user_Name: action.payload.user_name
        }
      };

    case "REGISTER_USER":
      console.log("USER_REGISTER", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userid", action.payload.user_id);
      return {
        ...state,
        isLogged: true,
        user: {
          user_Id: action.payload.user_id,
          user_Name: action.payload.user_name
        }
      };

    case "ADD_Vacation":
      console.log("ADD VACA", action.payload);
      return {
        ...state,
        vacations: [...state.vacations, action.payload]
      };

    case "EDIT_Vacation":
      console.log("EDIT VACA", action.payload);
      return {
        ...state,
        vacations: [...state.vacations, action.payload]
      };
    case "GET_ALL_USERS":
      return { ...state, allUsers: action.payload };

    default:
      return state;
  }
};
