import localStorage from "./localStorage";
export function authInfo() {
    return localStorage.get("user");
}
