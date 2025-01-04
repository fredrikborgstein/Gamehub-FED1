export default function user() {
  const userObject = JSON.parse(sessionStorage.getItem("user"));
  const username = userObject.user ? userObject.user : null;
  const email = userObject.email ? userObject.email : null;
  const avatar = userObject.avatar ? userObject.avatar : null;

  return {
    username,
    email,
    avatar,
  };
}
