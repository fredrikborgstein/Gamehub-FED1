import {databaseManager} from "./index.mjs";

export default async function user() {
  const dbManager = new databaseManager();
  const user = JSON.parse(sessionStorage.getItem("auth"));
  const userObject = await dbManager.getUser(user.username);
  const username = userObject.username ? userObject.username : null;
  const email = userObject.email ? userObject.email : null;
  const avatar = userObject.avatar ? userObject.avatar : null;

  return {
    username,
    email,
    avatar,
  };
}
