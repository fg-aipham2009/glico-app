import { get , post } from '../utils/http'

export default {
  getStoreDropDownList :function (id) {
    return get(`/mo/sysMStore/getStoreDropDownList?openId=${id}`)
  },
  saveAccessLog :function (params) {
    return post(`/userinfo/saveAccessLog`, params)
  }
}
