<template>
  <div>
    <div class="cont-foot">
      <ul class="clearfix" style="padding-bottom: 0">
        <li v-on:click="menuJump('/aboutshop')">
          <span>お店について</span
          ><img src="@/assets/images/foot_white_right.svg" />
        </li>
        <li v-on:click="menuJump('/map')">
          <span>アクセス</span
          ><img src="@/assets/images/foot_white_right.svg" />
        </li>
        <li v-on:click="menuJump('/privacypolicy')">
          <span>プライバシーポリシー</span
          ><img src="@/assets/images/foot_white_right.svg" />
        </li>
      </ul>
      <ul class="clearfix" style="width: 100%; padding-top: 0">
        <li style="width: 100%" v-on:click="menuJump('/storeDetail')">
          <span>特定商取引法に基づく表記</span
          ><img src="@/assets/images/foot_white_right.svg" />
        </li>
      </ul>
      <div class="copyright">ⓒGong cha Japan</div>
    </div>
    <el-dialog
      v-model="showInquiryFlag"
      width="70%"
      :show-close="false"
      center
      class="inquiry-dialog"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
        <div class="inquiry-form-group">
          <label>お問い合わせ内容<span>必須</span></label>
          <div class="tips mb10">100文字以内で入力してください。</div>
          <el-form-item label="" prop="inquiry">
            <el-input
              v-model="ruleForm.inquiry"
              type="textarea"
              class="margin-left: 0px;"
              maxlength="100"
              size="mini"
            />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <p>お問い合わせをしますか？</p>
        <p class="final-line">
          （Bistro Lapinのトーク画面に<br />メッセージを送信します）
        </p>
        <el-button type="info" @click="showInquiryFlag = false"
          >いいえ</el-button
        >
        <el-button type="danger" @click="submitInquiry">はい</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      showInquiryFlag: false,
      ruleForm: {
        inquiry: "",
      },
      rules: {
        inquiry: [
          {
            required: true,
            message: "[お問い合わせ内容]を入力してください。",
            trigger: "blur",
          },
          { max: 100, message: "100文字以内で入力してください。" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    showInquiry() {
      this.showInquiryFlag = true;
    },
    submitInquiry() {
      let that = this;
      console.log("trying to inquiry");

      that.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (process.env.NODE_ENV === "development") {
            this.showInquiryFlag = false;
            return false;
          } else {
            liff
              .sendMessages([
                {
                  type: "text",
                  text:
                    "\uDBC0\uDC84お問い合わせがあります。\n" +
                    that.ruleForm.inquiry,
                },
              ])
              .then(() => {
                console.log("message sent");
                liff.closeWindow();
              })
              .catch((err) => {
                console.log("error", err);
              });
          }
        } else {
          setTimeout(() => {
            let isError = document.getElementsByClassName("is-error");
            isError[0].querySelector("textarea").focus();
          }, 100);
          console.log("error submit!!");
          return false;
        }
      });
    },
    menuJump(url) {
      this.$router.push({ path: url });
    },
  },
};
</script>

<style scoped>
.inquiry-form-group :deep(.el-form-item) {
  margin: 20px 0 0;
}
</style>
