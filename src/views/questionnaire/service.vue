<template>
  <div>
    <div class="container-servive">
      <div class="questionneaire-servive">
        <div class="title">
          <p>「SUNAOランチ」のサービスについて</p>
          <p>お声をお聞かせください</p>
        </div>
        <div class="content-servive">
          <div class="text-center note">
            <p>※質問は全部で5問あります。</p>
          </div>
          <p class="fs-13">
            この度は、「SUNAOランチ」を購入くださりありがとうございました。よりご満足頂けるサービスにしていくため、以下のアンケートにて率直なご意見をお聞かせください。※「SUNAOランチ」をお召しあがり頂いたあとでお答えください。※アンケートの回答は、必ずあなたご自身のご意見をお答えください。
          </p>
          <div class="text-center"></div>
        </div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          label-position="top"
        >
          <!-- Q1. -->
          <div class="question">
            <div class="label-servive">Q1.</div>
            <div class="content-servive">
              <div class="text">
                このサービスを利用してみて、
                <span class="red-text">良い</span>
                と思われた点についてできるだけ具体的にお書きください。
              </div>
              <div class="input">
                <el-form-item prop="question1">
                  <el-input
                    type="text"
                    v-model.number="formData.question1"
                    placeholder="回答を記入してください"
                    autocomplete="off"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q2. -->
          <div class="question">
            <div class="label-servive">Q2.</div>
            <div class="content-servive">
              <div class="text">
                このサービスを利用してみて、<span class="blue-text"
                  >良くない</span
                >と思われた点についてできるだけ具体的にお書きください。
              </div>
              <div class="input">
                <el-form-item prop="question2">
                  <el-input
                    type="text"
                    v-model.number="formData.question2"
                    placeholder="回答を記入してください"
                    autocomplete="off"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q3. -->
          <div class="question">
            <div class="label-servive">Q3.</div>
            <div class="content-servive">
              <div class="text">
                このサービスを、
                <span class="red-text">また利用したい</span>
                と思いますか。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question3">
                  <el-select
                    v-model="formData.question3"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ3"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q4. -->
          <div class="question">
            <div class="label-servive">Q4.</div>
            <div class="content-servive">
              <div class="text">
                このサービスを利用してみて、あなたが今後、このメニューを友人・知人(あるいは、同僚・家族)などの親しい人に
                <span class="red-text">どの程度薦めたいと思いますか。</span>
                薦めたい気持ちについて、10点を満点としてあなたのお気持ちに近い点数をお選びください。
              </div>
              <div class="input">
                <el-form-item prop="question4">
                  <div class="slider-service">
                    <el-slider
                      input-size="small"
                      :step="1"
                      :max="10"
                      class="custom-slider"
                      :marks="marks"
                      v-model="formData.question4"
                    >
                    </el-slider>
                    <div class="irs-grid">
                      <div class="fs-18">0</div>
                      <div class="irs-gird-item fs-14">5</div>
                      <div class="fs-18">10</div>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q5. -->
          <div class="question">
            <div class="label-servive">Q5.</div>
            <div class="content-servive">
              <div class="text">
                Q5.このサービスについてご要望などありましたら、どんなことでも構いませんので、ご自由にお書きください。
              </div>
              <div class="input">
                <el-form-item prop="question5">
                  <el-input
                    type="text"
                    v-model.number="formData.question5"
                    placeholder="回答を記入してください"
                    autocomplete="off"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Button Submit Form -->
          <el-form-item>
            <div class="btn-form btn-orange-main">
              <div class="border-input border-input-black">
                <el-button
                  size="default"
                  @click="resetForm('formData')"
                  class="btn-black-main"
                  >キャンセル</el-button
                >
              </div>
              <div class="border-input">
                <el-button
                  type="primary"
                  size="default"
                  @click="submitForm('formData')"
                >
                  送信
                </el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "service",
  data() {
    return {
      listQ3: [
        "ぜひ利用したい",
        "利用したいと思う",
        "気が向けば利用してもよい",
        "あまり気が進まない",
        "利用したくない",
        "わからない",
      ],
      formData: {
        question1: "",
        question2: "",
        question3: "",
        question4: 0,
        question5: "",
      },
      marks: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
      },
      rules: {
        question1: [
          {
            required: true,
            message: "Q1を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question2: [
          {
            required: true,
            message: "Q2を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question3: [
          {
            required: true,
            message: "Q3を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  methods: {
    // Submit Form
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            openId: localStorage.getItem("openId"),
            questionType: "service-question",
            questionName: "サービスアンケート",
            ...this.formData,
          };
          this.$post("/feedback/addFeedback", data)
            .then((response) => {
              if (response.code == 200 || response.code === "200") {
                this.$router.push({
                  name: "questionnaire-completed",
                });
              } else {
                this.$message.error(response.msg || "ERROR");
              }
            })
            .catch((err) => {
              this.$message.error(err.response?.data?.msg || "ERROR");
            });
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName("is-error");
            const el = isError[0]?.querySelector("input, textarea, select");
            if (el) el.focus();
          }, 100);
          return false;
        }
      });
    },
    // Reset Form
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    RuleQ4(rule, value, callback) {
      if (value === 0) {
        callback("空白のままにすることはできません");
      } else {
        callback();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container-servive {
  margin: 63px 24px 0px 24px;
  padding-top: 0;
  .title {
    line-height: 17px;
    padding: 10px 0px;
    margin-bottom: 5px;
    background-color: #ffe9b8;
    margin: 0px -24px 7px -24px;
    // padding: 3px 0px 3px 0px;
    text-align: center;
  }
  .label-servive {
    background-color: #ffe9b8;
    margin: 0px -24px 7px -24px;
    padding: 0px 24px 0px 24px;
    font-size: 22px;
    font-weight: bold;
  }
  .btn-form {
    margin-top: 28px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .border-input {
      width: 100%;
      .el-button {
        font-size: 17px;
      }
    }
    .border-input + .border-input {
      margin-left: 24px !important;
    }
  }
  .content-servive {
    .note {
      border: 3px solid #ffe9b8;
      margin-bottom: 17px;
      margin-top: 17px;
      font-size: 15px;
    }
    .fs-13 {
      font-size: 13px;
      margin-bottom: 23px;
    }
    .text {
      margin-bottom: 10px;
      font-size: 16px;
      .blue-text {
        color: #0008c4;
      }
      .red-text {
        color: #dc143c;
      }
    }
    .input {
      margin-bottom: 10px;
      .slider-service {
        background-color: white;
        padding: 0px 20px 11px 20px;
        border: 1px solid;
        border-radius: 5px;
      }
      .fs-18 {
        font-size: 18px;
      }
      .fs-14 {
        font-size: 14px;
      }
      .irs-grid {
        display: flex;
        justify-content: space-between;
        .irs-gird-item {
          margin-left: 9px;
        }
      }
    }
    margin-bottom: 35px;
  }
}
</style>
<style lang="scss">
.container-servive {
  .el-select-dropdown.el-popper {
    z-index: 90;
  }
  .el-slider__runway {
    height: 16px;
    background: linear-gradient(
      90deg,
      rgba(255, 215, 0, 1) 0%,
      rgba(255, 145, 0, 1) 44%,
      rgba(255, 75, 0, 1) 99%
    );
    .el-slider__stop {
      display: none;
    }
    .el-slider__marks-text {
      margin-top: 20px;
      width: 1px;
      height: 8px;
      background: #744300;
    }
    .el-slider__marks-text:first-child {
      margin-top: 20px;
      width: 0px;
      height: 0px;
      background: #000;
    }
    .el-slider__marks-text:nth-child(11) {
      margin-top: 20px;
      width: 0px;
      height: 0px;
      background: #744300;
    }
    .el-slider__bar {
      display: none;
    }
    .el-slider__button-wrapper {
      top: -10px;
      z-index: 1;
      .el-slider__button {
        width: 22px;
        height: 22px;
        border: 1px solid #3d0400;
      }
    }
  }
}
</style>
