export default {
  data () {
    return {
      openId: null
    }
  },
  methods: {
    async checkOpenId () {
      if (localStorage.getItem('openId')) {
        this.openId = localStorage.getItem('openId')
      } else {
        await this.getProfile()
      }
    },
    async getProfile () {
      try {
        let liffRes
        let userAuthInfoSession = sessionStorage.getItem('userAuthInfo')
        if (userAuthInfoSession) {
          liffRes = JSON.parse(userAuthInfoSession)
          if (liffRes.openId) {
            this.openId = liffRes.openId
            localStorage.setItem('openId', this.openId)
            return
          }
        } else {
          // eslint-disable-next-line no-undef
          liffRes = await liff.getProfile()
          this.openId = liffRes.userId
          localStorage.setItem('openId', this.openId)
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
