export default [
    {
      path: "/pdf/:id",
      component: () => import("@/views/pdf/index.vue"),
      meta: {
        title: "",
        authless: true,
      },
    },
    {
      path: "/product-today",
      name: "product-today",
      component: () => import("@/views/productToday/index.vue"),
      meta: {
        title: "商品情報",
        authless: true,
      },
    },
    {
      path: "/authen",
      redirect: "/registration",
      component: () => import("@/views/authen/index.vue"),
      meta: {
        authless: false,
        authLayout: false,
        checkStoreId: false,
        authLayoutLogin: false,
      }, //authentication should not be executed
      children: [
        {
          path: "/registration",
          name: "registration",
          meta: {
            authLayoutLogin: true,
            offLogoHearder: true,
          },
          component: () => import("@/views/authen/login.vue"),
        },
        {
          path: "/register",
          name: "register",
          meta: {
            title: "登録情報の編集",
            noHeader: true,
            authLayout: true,
            authless: true,
          },
          component: () => import("@/views/authen/register.vue"),
        },
        {
          path: "/new-delivery-address",
          name: "new-delivery-address",
          meta: {
            authless: true,
          },
          component: () => import("@/views/authen/newDeliveryAddress.vue"),
        },
        {
          path: "/guidance-new-qr",
          name: "guidance-new-qr",
          meta: {
            authless: true,
          },
          component: () => import("@/views/authen/guidanceNewQr.vue"),
        },
        {
          path: "/confirmation-delivery-address",
          name: "confirmation-delivery-address",
          meta: {
            confirmationAddress: true,
            offLogoHearder: true,
          },
          component: () =>
            import("@/views/authen/confirmationDeliveryAddress.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "main",
      redirect: "/confirmation-delivery-address",
      component: () => import("@/views/layouts/main.vue"),
      meta: {
        authLayout: true,
        authless: false,
        checkStoreId: false,
      }, //authentication should not be executed
      children: [
        {
          path: "/order",
          name: "order",
          component: () => import("@/views/order/index.vue"),
          meta: {
            // title: "オーダー",
            title: "商品をお選びください",
            noHeader: true,
            mt: "mt-81",
          },
        },
        // Cart
        {
          path: "/cart",
          name: "cart",
          component: () => import("@/views/cart/cart.vue"),
          meta: {
            title: "カート",
            noHeader: true,
            // title_2: "ご注文内容をご確認ください",
            fw: "fw-m",
            mt: "mt-4",
          },
        },
        {
          path: "/order-confirmation",
          name: "order-confirmation",
          component: () => import("@/views/cart/orderConfirmation.vue"),
          meta: {
            title: "注文確認",
            noHeader: true,
            // title_2: "ご注文を確定してください",
            // line: true,
            mt: "mt-23",
          },
        },
        {
          path: "/order-completed",
          name: "order-completed",
          component: () => import("@/views/cart/orderCompleted.vue"),
          meta: {
            title: "注文完了",
            noHeader: true,
            // title_2: "ご注文が完了しました",
            mt: "mt-73",
          },
        },

        // Information Product
        {
          path: "/information/terms-and-conditions",
          name: "information.policy",
          component: () =>
            import("@/views/informationProduct/privacyPolicy.vue"),
          meta: {
            title: "サービス利用規約",
            noHeader: true,
          },
        },
        {
          path: "/information/about",
          name: "information.about",
          component: () => import("@/views/index/home.vue"),
          meta: {
            title: "お店について",
            noHeader: true,
            checkStoreId: false,
            // line: true,
            fw: "fw-m",
            mt: "mt-30",
          },
        },
        {
          path: "/information/commercial-law",
          name: "information.commercial-law",
          component: () =>
            import("@/views/informationProduct/commercialLaw.vue"),
          meta: {
            title: "特定商取引法に基づく表記",
            noHeader: true,
            line: true,
            fw: "fw-m",
          },
        },


        {
          path: "/autherror",
          name: "autherror",
          component: () => import("@/views/auth/autherror.vue"),
          meta: {
            title: "SUNAO DELIVERY",
            authless: true,
            checkStoreId: false,
          },
        },
        {
          path: "/privacypolicy",
          name: "privacypolicy",
          component: () => import("@/views/privacypolicy/index.vue"),
          meta: {
            title: "SUNAO DELIVERY",
            authless: true,
            checkStoreId: false,
          },
        },
        {
          path: "/storeDetail",
          name: "storeDetail",
          component: () => import("@/views/storeDetail/index.vue"),
          meta: {
            title: "江崎グリコ",
            authless: true,
            checkStoreId: true,
          },
        },
        {
          path: "/order-history",
          name: "order-history",
          component: () => import("@/views/orderhistory/index.vue"),
          meta: {
            title: "注文履歴",
            noHeader: true,
            mt: "mt-38",
            checkStoreId: false,
          },
        },
        {
          path: "/order-detail",
          name: "order-detail",
          component: () => import("@/views/orderDetail/index.vue"),
          meta: {
            title: "注文履歴詳細",
            noHeader: true,
            checkStoreId: false,
          },
        },

        {
          path: "/orderconfirm",
          name: "orderconfirm",
          component: () => import("@/views/orderconfirm/index.vue"),
          meta: {
            title: "江崎グリコ",
            checkStoreId: false,
          },
        },
        // お店について
        {
          path: "/aboutshop",
          name: "aboutshop",
          component: () => import("@/views/aboutshop/index.vue"),
          meta: {
            title: "江崎グリコ",
            checkStoreId: true,
          },
        },
        {
          path: "/paycomplete",
          name: "paycomplete",
          component: () => import("@/views/cart/orderCompleted.vue"),
          meta: {
            // title: "注文完了",
            // title_2: "ご注文が完了しました",
            authless: true,
            checkStoreId: true,
          }, //authentication should not be executed
        },
        {
          path: "/paycancel",
          name: "paycancel",
          component: () => import("@/views/pay/paycancel.vue"),
          meta: {
            title: "江崎グリコ",
            authless: true,
            checkStoreId: true, //authentication should not be executed
          },
        },
        {
          path: "/member/member-coupon",
          name: "member-coupon",
          component: () => import("@/views/member/member-coupon.vue"),
          meta: {
            title: "江崎グリコ",
            checkStoreId: false,
          },
        },
        {
          path: "/product-detail",
          name: "productDetails",
          component: () => import("@/views/order/productdetails.vue"),
          meta: {
            title: "商品情報",
            noHeader: true,
            // title_2: "商品の情報をご確認ください",
            // line: true,
            mt: "mt--30",
          },
        },
        // マイページ
        {
          path: "/my-page",
          name: "my-page",
          component: () => import("@/views/mypage/index.vue"),
          meta: {
            title: "マイページ",
            noHeader: true,
            checkStoreId: false,
            // line: true,
          },
        },
        {
          path: "/register-information",
          name: "register-information",
          component: () => import("@/views/mypage/registerInformation.vue"),
          meta: {
            title: "登録情報",
            noHeader: true,
            fw: "fw-m",
          },
        },
        {
          path: "/edit-register-information",
          name: "edit-register-information",
          component: () => import("@/views/mypage/editRegisterInformation.vue"),
          meta: {
            title: "登録情報の編集",
            noHeader: true,
            fw: "fw-m",
            mt: "mt-0",
          },
        },
        // {
        //   path: "/stamp-cards",
        //   name: "stamp-cards",
        //   component: () => import("@/views/mypage/stampCards.vue"),
        //   meta: {
        //     title: "スタンプカード・クーポン",
        //   },
        // },
        {
          path: "/service-questionnaire",
          name: "service-questionnaire",
          component: () => import("@/views/questionnaire/service.vue"),
          meta: {
            title: "サービスアンケート",
            authless: true,
            mt: "mt-65",
          },
        },
        {
          path: "/menu-questionnaire1",
          name: "menu-questionnaire1",
          component: () => import("@/views/questionnaire/menu1.vue"),
          meta: {
            title: "メニューアンケート",
            noHeader: true,
            // title_2: "1 / 3 ページ",
            authless: true,
            mt: "mt-40",
          },
        },
        {
          path: "/menu-questionnaire2",
          name: "menu-questionnaire2",
          component: () => import("@/views/questionnaire/menu2.vue"),
          meta: {
            title: "メニューアンケート",
            noHeader: true,
            // title_2: "2 / 3 ページ",
            authless: true,
            mt: "mt-40",
          },
        },
        {
          path: "/menu-questionnaire3",
          name: "menu-questionnaire3",
          component: () => import("@/views/questionnaire/menu3.vue"),
          meta: {
            title: "メニューアンケート",
            noHeader: true,
            // title_2: "3 / 3 ページ",
            authless: true,
            mt: "mt-40",
          },
        },
        {
          path: "/questionnaire-completed",
          name: "questionnaire-completed",
          component: () => import("@/views/questionnaire/completed.vue"),
          meta: {
            title: "メニューアンケート",
            authless: true,
          },
        },
      ],
    },
    {
      path: "/extbrowser",
      name: "extbrowser",
      component: () => import("@/views/auth/extbrowser.vue"),
      meta: {
        title: "SUNAO DELIVERY",
        authless: false,
        checkStoreId: false,
      },
    },];