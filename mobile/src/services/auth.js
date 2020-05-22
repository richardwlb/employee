import { AsyncStorage } from "react-native";

export const TOKEN_KEY = "Employee-token";
// export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY) !== null;

export const isSignedIn = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return (token !== null) ? true : false;
    
}
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
    // localStorage.getItem(TOKEN_KEY);  
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InJpY2hhcmR3bGIiLCJpYXQiOjE1ODcwNzc1MDgsImV4cCI6MTU4NzE2MzkwOH0.W0RiTsMsEMYiRgFEnUpEpszgpR57M2k2szK3TXiCqoY";
export const doLogin = token => {
    // localStorage.setItem(TOKEN_KEY, token)
    AsyncStorage.setItem(TOKEN_KEY, token);
};
export const logout = async () => {
    // localStorage.removeItem(TOKEN_KEY)
    await AsyncStorage.removeItem(TOKEN_KEY);
};