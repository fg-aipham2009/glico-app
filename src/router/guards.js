export function setupNavigationGuards(router, { post, commonInstance }) {
  const LIFF_ID = import.meta.env.VITE_APP_LIFF_ID || "";
  const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL || "";

  router.beforeEach((to, from, next) => {
    const toFullPath = to.fullPath;
    // Giống v2 main.js: chỉ trong LINE in-app mới chạy LIFF/auth; web thường → extbrowser
    const inLineClient =
      typeof liff !== "undefined" && liff.isInClient() === true;

    if (inLineClient) {
      setUrlParamToSessionStorage(
        decodeURIComponent(decodeURIComponent(toFullPath))
      );
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      if (to.meta.checkStoreId) {
        if (!localStorage.getItem("storeId")) {
          return next("/");
        }
      }
      if (!to.matched.some((record) => record.meta.authless)) {
        const openId = localStorage.getItem("openId");
        if (import.meta.env.DEV) {
          sessionStorage.setItem("platformId", LIFF_ID);
          localStorage.setItem("openId", "Uf4cccd54a2ae6c8848e9a8136c9d018c");
          // localStorage.setItem("storeId", "1");
          getSysMStore(next);
          redirectInitMember(openId, next);
        } else {
          const liffStateUrlKey = "liff.state";
          let liffStateUrl = to.query[liffStateUrlKey];
          if (!liffStateUrl) {
            liffStateUrl = sessionStorage.getItem(liffStateUrlKey);
            liffStateUrl = decodeURIComponent(liffStateUrl);
            liffStateUrl = decodeURIComponent(liffStateUrl);
            setUrlParamToSessionStorage(liffStateUrl);
          }
          getSysMStore(next);
          if (liff.id == null) {
            liff.init(
              { liffId: LIFF_ID },
              () => {
                liffLogin(liff, to);
                getProfile(next);
              },
              (err) => {
                console.log("---- error at LIFF initialization", err);
                router.push({ name: "autherror" });
              }
            );
          } else {
            liffLogin(liff, to);
            if (sessionStorage.getItem("userAuthInfo")) {
              next();
            } else {
              getProfile(next);
            }
          }
        }
      } else {
        console.log("---- authentication was not executed");
        next();
      }
    } else {
      // 外部ブラウザ — giống v2: luôn vào màn extbrowser trừ khi đang ở route đó
      if (to.name !== "extbrowser") {
        return next({ name: "extbrowser" });
      }
      next();
    }
  });

  router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    console.log(error.message, "sdsds");
    if (isChunkLoadFailed) {
      console.log("Loading chunk");
    }
  });

  function setUrlParamToSessionStorage(url, startIndex) {
    if (url) {
      if (startIndex == undefined || startIndex === null) {
        startIndex = 1;
      }
      const queryUrlParamArray = url.split("?");
      if (queryUrlParamArray && queryUrlParamArray.length > startIndex) {
        const urlParamArray = queryUrlParamArray[startIndex].split("&");
        for (const key in urlParamArray) {
          const paramKeyValArray = urlParamArray[key].split("=");
          if (paramKeyValArray && paramKeyValArray.length > 1) {
            localStorage.setItem(paramKeyValArray[0], paramKeyValArray[1]);
            sessionStorage.setItem(paramKeyValArray[0], paramKeyValArray[1]);
          }
        }
      }
    }
  }

  function redirectInitMember(openId, next) {
    const userAuthInfo = {};
    userAuthInfo.platformId = LIFF_ID;
    userAuthInfo.openId = openId;
    initMember(userAuthInfo, next);
  }

  function liffLogin(liffObj, to) {
    if (!liffObj.isLoggedIn()) {
      let liffStateUrl = to.query["liff.state"];
      let liffRedirectUri =
        ENDPOINT_URL + liffStateUrl ? liffStateUrl : "";
      if (liffRedirectUri) {
        liffRedirectUri = decodeURIComponent(liffRedirectUri);
        liffRedirectUri = decodeURIComponent(liffRedirectUri);
        liffObj.login({
          redirectUri: liffRedirectUri,
        });
      } else {
        liffObj.login();
      }
    }
  }

  function getProfile(next) {
    console.log(4);
    const isLoggedIn = liff.isLoggedIn();
    if (isLoggedIn) {
      liff
        .getProfile()
        .then((profile) => {
          console.log(profile, "profile");
          if (typeof profile.pictureUrl !== "undefined") {
            sessionStorage.setItem("pictureUrl", profile.pictureUrl);
          } else {
            console.log(
              "---- user has not set picture. alternative image should be set."
            );
            sessionStorage.setItem("pictureUrl", "");
          }
          sessionStorage.setItem("displayName", profile.displayName);
          const userAuthInfo = {};
          userAuthInfo.userName = profile.displayName;
          userAuthInfo.userImg = profile.pictureUrl;
          userAuthInfo.platformId = LIFF_ID;
          const liffUserId = profile.userId;
          userAuthInfo.openId = liffUserId;
          localStorage.setItem("openId", liffUserId);
          sessionStorage.setItem("userAuthInfo", JSON.stringify(userAuthInfo));
          console.log("---- user profile has been updted");
          initMember(userAuthInfo, next);
        })
        .catch((err) => {
          console.log("---- error at get profile", err);
          next();
        });
    } else {
      setTimeout(() => {
        getProfile(next);
      }, 1000);
    }
  }

  function initMember(userAuthInfo, next) {
    const requestData = {
      openId: userAuthInfo.openId,
      storeId: localStorage.getItem("storeId"),
      avatarUrl: userAuthInfo.userImg,
      nickName: userAuthInfo.userName,
    };
    post("/mo/member/initMember", requestData).then(
      (response) => {
        if (response.code == 200) {
          const memberId = response.data;
          sessionStorage.setItem("memberId", memberId);
          const userAuthInfoJson = sessionStorage.getItem("userAuthInfo");
          if (userAuthInfoJson) {
            const parsed = JSON.parse(userAuthInfoJson);
            parsed.memberId = memberId;
            sessionStorage.setItem("userAuthInfo", JSON.stringify(parsed));
            checkPartnerUser(parsed, next);
          } else {
            userAuthInfo.memberId = memberId;
            commonInstance.getUserAuthInfo(userAuthInfo, next);
          }
        } else {
          console.log("initMember fail", response.msg);
        }
      },
      (err) => {
        console.log("---- error at saveUserInfo", err);
      }
    );
  }

  async function checkPartnerUser(userAuthInfo, next) {
    const res = await post("/customerinfo/getTPartnerUser", {
      openId: localStorage.getItem("openId"),
      storeId: localStorage.getItem("storeId"),
    });
    if (res.data) {
      localStorage.setItem("getTPartnerUser", JSON.stringify(res.data.userId));
    }
    next();
    if (
      localStorage.getItem("type") === "richMenu" &&
      !localStorage.getItem("storeId") &&
      res.data
    ) {
      localStorage.setItem("storeId", res.data.storeId);
      return next();
    }
    if (!res.data || !localStorage.getItem("storeId")) {
      return next("/registration");
    }
  }

  function getSysMStore(next) {
    const storeId = localStorage.getItem("storeId");
    if (storeId) {
      let storeData = localStorage.getItem("storeData");
      if (storeData) {
        storeData = JSON.parse(storeData);
        if (storeId != storeData.storeId) {
          getSysMStoreInfo(storeId, next);
        }
      } else {
        getSysMStoreInfo(storeId, next);
      }
    }
  }

  function getSysMStoreInfo(storeId, next) {
    if (storeId) {
      const par = { storeId };
      post("/mo/sysMStore/getSysMStore", par).then((response) => {
        const res = response.data;
        next();
        if (response.code == 200) {
          localStorage.setItem("storeId", res.storeId);
          sessionStorage.setItem("storeName", res.storeName);
          localStorage.setItem("storeData", JSON.stringify(res));
        } else {
          localStorage.removeItem("storeId");
          localStorage.removeItem("storeId");
          return next("/guidance-new-qr");
        }
      });
    }
  }
}
