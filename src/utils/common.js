import userApi from '../api/user.js'
class common{
  changeLanguage(i18n, lang) {
    i18n.locale = lang
    sessionStorage.setItem('localLanguages', lang)
  }
  getUserAuthInfoForMyPage(vue) {
    //获取用户信息
    let userAuthInfoJson = sessionStorage.getItem('userAuthInfo')
    let userAuthInfo = JSON.parse(userAuthInfoJson);
    let openId = sessionStorage.getItem('openId')
    if (!openId){
      vue.$router.push({name:'error', params : {errMsg: 'openId is null'}})
      return
    }
    if (userAuthInfo != null && userAuthInfo.userName) {
      vue.userName = userAuthInfo.userName;
      vue.userImg = userAuthInfo.userImg;
    } else {
      //查询数据库中是否存在用户信息。如果存在，那么通过数据库进行查询
      let param = {
        openId: openId
      }
      userApi.getUserAuthInfo(param)
        .then((response) => {
          if (response.code = 200 && response.data != null) {
            let userAuthInfoNew = {};
            userAuthInfoNew.userName = response.data.nickName;
            userAuthInfoNew.userImg = response.data.avatarUrl;
            userAuthInfoNew.memberId = userAuthInfo.memberId;
            sessionStorage.setItem('userAuthInfo', JSON.stringify(userAuthInfoNew))
            vue.userName = userAuthInfo.userName;
            vue.userImg = userAuthInfo.userImg;
          } else {
            vue.$router.push({name:'error', params : {errMsg: 'get user auth info fail'}})
          }
        })
    }
  }

  getUserAuthInfo(userAuthInfo, next){
    let param = {
      openId: userAuthInfo.openId
    }
    userApi.getUserAuthInfo(param)
      .then((response) => {
        if (response.code = 200 && response.data != null) {
          userAuthInfo.userName = response.data.nickName;
          userAuthInfo.userImg = response.data.avatarUrl;
          sessionStorage.setItem('userAuthInfo', JSON.stringify(userAuthInfo))
          next();
        }
      })
  }

  //获取服务器时间
  getServerDate() {
    // var xhr = null;
    // if (window.XMLHttpRequest) {
    //   xhr = new window.XMLHttpRequest();
    // } else { // ie
    //   xhr = new ActiveObject("Microsoft")
    // }

    // var baseURL = ""
    // if (process.env.NODE_ENV == 'development') {
    //   baseURL ='http://localhost:5000/web/server/info/getSysDate';
    // } else {
    //   baseURL ='https://uz-api-test.uz-apps.com/web/server/info/getSysDate';
    // }
    // xhr.open("GET", baseURL, false)//false不可变
    // xhr.send(null);
    // var date = JSON.parse(xhr.response).data;
    // console.log(date)
    return this.getJpTime(new Date())
  }

      //将时间转为北京时区时间

  getJpTime(date) {
    var d = new Date(date);
    var timezone = 9; //目标时区时间，东9区
    var offset_GMT = d.getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
    var nowDate = d.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    console.log("东9区现在是：" + targetDate);
    return targetDate;
  }

      //两个时间相差天数 兼容firefox chrome
  dateDifference(sDate1, sDate2) {
    //sDate1和sDate2是2006-12-18格式
    let dateSpan,iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000 * 365));
    return iDays
  }
  setUrlParam(url, paramArray){
    if (url.indexOf("?") > -1){
      paramArray.forEach((param, key) => {
        url = url.replace("{" + key + "}", param);
      });
    }
    return url;
  }
  sendInquiryMsg(vue, ruleForm) {
    let common = this;
    let that = vue
    console.log("trying to inquiry")
    that.$refs[ruleForm].validate((valid) => {
      console.log(that.ruleForm.inquiry);
      if (valid) {
        let params = {
          platformId: sessionStorage.getItem('appId'),
          partnerId: process.env.PARTNER_ID,
          openId: sessionStorage.getItem('openId'),
          consultContext: that.ruleForm.inquiry
        }
        that.$post('/consultSendMail', params)
          .then((response) => {
            if (response.code == 200) {
              if (process.env.NODE_ENV === 'development') {
                that.dia_inquiry_visible = false
                return false
              } else {
                liff.sendMessages([
                  {
                    type: 'text',
                    text: '\uDBC0\uDC84お問い合わせがあります。\n' + that.ruleForm.inquiry
                  }
                ])
                  .then(() => {
                    console.log('message sent')
                    common.sendMessageAfter(that, true);
                  })
                  .catch((err) => {
                    console.log('error', err);
                  })
              }
            }
          })
          .catch(() => {
            console.log("mail request fail")
          })
      } else {
        setTimeout(() => {
          var isError = document.getElementsByClassName('is-error')
          isError[0].querySelector('textarea').focus()
        }, 100)
        console.log('error submit!!')
        return false
      }
    })
  }
  sendMessageAfter(vue, isClose){
    let isRich = sessionStorage.getItem("rich");
    console.log("isRich", isRich);
    if (isClose){
      liff.closeWindow();
    } else {
      if (isRich != null && isRich != undefined && isRich == "1"){
        liff.closeWindow();
      } else {
        let params = {
          iframeLinkUrl: vue.$route.query.redirectUrl,
          iframeVisible: true
        };
        vue.$router.push({
          name: 'my',
          params: params
        });
      }
    }
  }
}
export default common
