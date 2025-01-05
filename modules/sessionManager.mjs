export default class SessionManager {
    constructor() {
        this.sessionKey = "auth";
    }

    setSession(authData) {
        if (authData && authData.sessionId && authData.expiresAt) {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(authData));
        } else {
            throw new Error("Invalid session data");
        }
    }

    getSession() {
        const sessionData = sessionStorage.getItem(this.sessionKey);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    clearSession() {
        sessionStorage.removeItem(this.sessionKey);
    }

    isSessionValid() {
        const sessionData = this.getSession();
        return sessionData && sessionData.expiresAt > Date.now();
    }
}
