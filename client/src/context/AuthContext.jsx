import { createContext,useCallback,useEffect,useState } from "react";
import { baseUrl, postRequest,getRequest } from "../utils/services";


export const  AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const [user, setUser] = useState(null);

    const [registerError,setRegisterError] = useState(null);
    const[isRegisterloading,setIsRegisterLoading] = useState(false);
    const [userExist,setUserExist] = useState(false);

    const [registerInfo,setRegisterInfo] = useState({
        actype:0,
        accountId:'',
        name:'',
        email:'',
        password:'',
    })

    const [updateProfileError,setUpdateProfileError] = useState(null);
    const[isUpdateProfileloading,setIsUpdateProfileLoading] = useState(false);

    const [updateProfileInfo,setUpdateProfileInfo] = useState({
        Id:'',
        oldAccountId:'',
        accountId:'',
        name:'',
        aboutYourself:'',
        facebook:'',
        instagram:'',
        youtube:'',
        linkedin:'',
        github:'',
        twitter:'',
    })

    const [loginError,setLoginError] = useState(null);
    const[isloginloading,setIsLoginLoading] = useState(false);

    const [loginInfo,setLoginInfo] = useState({
        // actype:'',
        // accountId:'',
        email:'',
        password:'',
    })

    // console.log("User",user);

    useEffect(()=>{
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    },[])

    // console.log("registerinfo",registerInfo);

    // get the user registration info from  Registration form
    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info);
    },[])

    // get the user profile udpate info from  profile update form
    const updateProfileupdateInfo = useCallback((info)=>{
        setUpdateProfileInfo(info);
    },[])


    // get the user login info from Login form
    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info);
    },[])


    // User register
    const registerUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if(response.error){
            return setRegisterError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    },[registerInfo])

    // User register
    const profileUpdate = useCallback(async(e)=>{
        e.preventDefault();
        setIsUpdateProfileLoading(true);
        setUpdateProfileError(null);

        const response = await postRequest(`${baseUrl}/users/updateProfile`,JSON.stringify(updateProfileInfo));

        setIsUpdateProfileLoading(false);

        if(response.error){
            return setUpdateProfileError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    },[updateProfileInfo])

    // User Login
    const loginUser = useCallback(async(e)=>{

        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo));

        setIsLoginLoading(false);
        // console.log("respose",response);
        if(response.error){
            return setLoginError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    
    },[loginInfo])

    //User Logout
    const logoutuser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null);
    },[])
    // console.log("User",user);
    // console.log("loginInfo",loginInfo);
    const checkUserById = useCallback(async (e, updatedAccountId) => {
        e.preventDefault();
        if (updateProfileInfo.oldAccountId !== updatedAccountId) {
            const response = await getRequest(`${baseUrl}/users/find/account/${updatedAccountId}`);
            if (response) {
                setUserExist(true);
            } else {
                setUserExist(false);
            }
        }
    }, []);


    return (
    <AuthContext.Provider 
        value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterloading,
            logoutuser,
            loginUser,
            loginError,
            loginInfo,
            isloginloading,
            updateLoginInfo,
            updateProfileInfo,
            updateProfileError,
            updateProfileupdateInfo,
            isUpdateProfileloading,
            profileUpdate,
            checkUserById,
            userExist
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};