import { useContext, createContext, useReducer, ReactNode, ReactElement } from "react";
import axios, {AxiosInstance} from "axios"
import reducer from "./reducer";


// Type the addUserToLocalStorage function


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

type UserData={
    name:string;
    _id:string;
}
type User = {
    user: UserData; 
    token: string; 
    
  };

type InitialState = {
    isLoading: boolean;
    user : UserData| null;
    token:string|null;
}

const initialState:InitialState ={
    isLoading:false,
    token: token,
    user: user ?JSON.parse(user):null,
}

type AppContextValue = {
    user: UserData|null ;
    signUp: (currentUser: {
        name:string;
        email:string;
        password:string;
    }) => void;
    login: (currentUser: {
        email:string;
        password:string;
    }) => void;

}

const AppContext = createContext<AppContextValue | undefined>(undefined);

type ChildrenType={
    children?: ReactElement | ReactElement[] |ReactNode| undefined
}
const AppProvider = ({ children }:ChildrenType): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addUserToLocalStorage = ({ user, token }: User): void => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      };
      
      // Type the removeUserFromLocalStorage function
      const removeUserFromLocalStorage = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      };

    // Create an instance of Axios for authenticated requests.
    const authFetch: AxiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
    });

    
    const signUp = async (currentUser:{
        name:string;
        email:string;
        password:string;
    }) => {
        dispatch({ type: "BEGIN" })
        try {
            const response = await authFetch.post('/api/v1/user/signup', currentUser);

            let { user, token } = response.data;
            user = {
                name:user.Uname,
                _id:user.Uid
            }
        
            dispatch({
                type: "REGISTER_USER_SUCCESS",
                payload: { user, token }
            })
            addUserToLocalStorage({ user, token })
            // displayAlert("Signed up successfully!", "success")
        } catch (error) {
            console.log(error)
            window.alert(error)
           
        } 
    }

    //===================LOGIN USER===============================//
    const login = async (currentUser:{
        email:string;
        password:string;
    }) => {
        dispatch({ type: "BEGIN" })
        try {
      
            const response = await authFetch.post('/api/v1/user/login', currentUser)
       
            let { user, token } = response?.data;
            user = {
                name:user.Uname,
                _id:user.Uid
            }

            dispatch({
                type: "LOGIN_USER_SUCCESS",
                payload: { user, token }
            })
            addUserToLocalStorage({ user, token })      
        } catch (error) {
            console.log(error)
            window.alert(error)
         
        }
       
    }

    return (
        <AppContext.Provider value={{...state, signUp ,login }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext) as AppContextValue
}

export { AppProvider, initialState, useAppContext }