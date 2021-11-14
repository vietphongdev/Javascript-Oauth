const clientId = "sjfnsjknkjfnsls";
const redirectURL = "http://127.0.0.1:5500/client/index.html";

function handleLogin() {
  authAzure
    .loginPopup({ clientId, redirectURL })
    .then((res) => {
      console.log("login success", res);
    })
    .catch((err) => {
      console.log("login failed", err);
    });
}
