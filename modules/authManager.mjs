export default class AuthManager {
  generateSessionId() {
    return crypto.getRandomValues(new Uint32Array(4)).join("-");
  }

  async generatePasswordHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    convertedHash = this.arrayBufferToBase64(hash);
    return convertedHash;
  }

  async checkPassword(password, storedHash) {
    const passwordHashBuffer = await this.generatePasswordHash(password);
    const passwordHashBase64 = this.arrayBufferToBase64(passwordHashBuffer);

    return passwordHashBase64 === storedHash;
  }

  arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }
}
