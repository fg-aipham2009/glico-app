import {post} from '../utils/http'

export default {
  getUserAuthInfo:function (param) {
    return post('/userinfo/getuserinfo', param)
  }
}


