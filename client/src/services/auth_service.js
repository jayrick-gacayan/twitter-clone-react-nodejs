import axios from 'axios';
const API_URL = "http://localhost:3001/api/user/"

const register = (email, password, cfpswd) => {
    console.log("Email, Password, cfpswd", email, password, cfpswd);
    return axios.post(API_URL + 'register',
        {
            email,
            password
        }
    );
    
}

const login = (email, password) => {
    return axios.post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        const { id, email, accessToken } = response.data;
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify({id, email, accessToken}));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;
