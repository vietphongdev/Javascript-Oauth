const authAzure = (() => {
  const host = "http://localhost:4000/login";
  const POPUP_WIDTH = 480;
  const POPUP_HEIGHT = 600;

  function onpenSizedPopup(urlNavigation, popupName) {
    const width = window.outerWidth;
    const height = window.outerHeight;

    const left = Math.max(0, width / 2 - POPUP_WIDTH / 2);
    const top = Math.max(0, height / 2 - POPUP_HEIGHT / 2);

    const styles = `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, top=${top}, left=${left}`;

    return window.open(urlNavigation, popupName, styles);
  }

  return {
    loginPopup({ clientId, redirectURL }) {
      return new Promise((resolve, reject) => {
        const url = `${host}?client_id=${clientId}&redirect_url=${redirectURL}`;
        const popup = onpenSizedPopup(url, "Azure Sign In");

        if (!popup) {
          reject({ error: true, code: "Popup Blocked" });
        }

        if (popup.focus) {
          popup.focus();
        }

        const intervalId = setInterval(() => {
          if (popup.closed) {
            clearInterval(intervalId);
            reject({ error: true, code: "User canceled" });
            return;
          }

          let href = "";
          try {
            href = popup.location.href;
          } catch (error) {
            console.error(error);
          }

          if (!href || href === "about:blank") {
            return;
          }

          if (href.startsWith(redirectURL)) {
            const url = new URL(href);
            const token = url.searchParams.get("token");

            clearInterval(intervalId);
            if (token) {
              resolve({ error: false, token });
            } else {
              reject({ error: false, code: "Token invalid" });
            }
            popup.close();
          }
        }, 50);
      });
    },
  };
})();
