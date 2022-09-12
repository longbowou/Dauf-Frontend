import {defineStore} from "pinia";
import JwtService from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";

export interface User {
    name: string;
    surname: string;
    email: string;
    password: string;
    api_token: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        errors: {},
        user: {} as User,
        isAuthenticated: !!JwtService.getToken()
    }),
    getters: {
        currentUser: (state) => state.user,
        isUserAuthenticated: (state) => state.isAuthenticated,
        getErrors: (state) => state.errors,
    },
    actions: {
        setError(error) {
            this.errors = {...error};
        },
        setAuth(user) {
            this.isAuthenticated = true;
            this.user = user;
            this.errors = {};
            JwtService.saveToken(user.api_token);
        },
        setUser(user) {
            this.user = user;
        },
        setPassword(password) {
            this.user.password = password;
        },
        login(credentials) {
            return ApiService.post("login", credentials)
                .then(({data}) => {
                    this.setAuth(data);
                })
                .catch(({response}) => {
                    this.setError(response.data.errors);
                });
        },
        register(credentials) {
            return ApiService.post("register", credentials)
                .then(({data}) => {
                    this.setAuth(data);
                })
                .catch(({response}) => {
                    this.setError(response.data.errors);
                });
        },
        forgotPassword(payload) {
            return ApiService.post("forgot_password", payload)
                .then(() => {
                    this.setError({});
                })
                .catch(({response}) => {
                    this.setError(response.data.errors);
                });
        },
        verifyAuth(payload) {
            if (JwtService.getToken()) {
                ApiService.setHeader();
                ApiService.post("verify_token", payload)
                    .then(({data}) => {
                        this.setAuth(data);
                    })
                    .catch(({response}) => {
                        this.setError(response.data.errors);
                        this.logOut();
                    });
            } else {
                this.logOut();
            }
        },
        logOut() {
            this.isAuthenticated = false;
            this.user = {} as User;
            this.errors = [];
            JwtService.destroyToken();
            return
        },
    },
    share: {
        enable: true,
        initialize: true
    }
})