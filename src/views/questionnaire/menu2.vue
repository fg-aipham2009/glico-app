<template>
  <div>
    <!-- <div class="arror-left back-btn" @click="back()">
      <i class="el-icon-arrow-left"></i>
    </div> -->
    <div class="container-menu2">
      <div class="questionneaire-menu2">
        <div class="text-center page-num">
          <p>2 / 3 ページ</p>
        </div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          label-position="top"
        >
          <!-- Q6. -->
          <div class="question">
            <div class="label-menu2">Q6.</div>
            <div class="content-menu2">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、あなたが今後、このメニューを友人・知人(あるいは、同僚・家族)などの親しい人に<span
                  class="red-text"
                  >どの程度薦めたいと思いますか。</span
                >薦めたい気持ちについて、10点を満点としてあなたのお気持ちに近い点数をお選びください。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question6">
                  <div class="slider-service">
                    <el-slider
                      input-size="small"
                      :step="1"
                      :max="10"
                      class="custom-slider"
                      :marks="marks"
                      v-model="formData.question6"
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
              <div class="text fs-12">
                点数の参考・・・0点（全く推奨したくない）、5点（どちら
                ともいえない）、10点（非常に推奨したい）
              </div>
            </div>
          </div>
          <!-- Q7. -->
          <div class="question">
            <div class="label-menu2">Q7.</div>
            <div class="content-menu2">
              <div class="text mb-30">
                [Q1回答メニュー]を召しあがってみて、以下の項目について、どのように感じましたか。（それぞれひとつだけ)
              </div>
              <div class="input">
                <p>
                  どの程度、<span class="blue-text">「魅力」</span
                  >を感じましたか？
                </p>
                <el-form-item prop="Q71">
                  <el-select
                    v-model="formData.Q71"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ7"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content-menu2">
              <div class="input">
                <p>
                  どの程度、<span class="blue-text"
                    >「一般に市販されている他の商品とは違う特徴」</span
                  >
                  を感じましたか？
                </p>
                <el-form-item prop="Q72">
                  <el-select
                    v-model="formData.Q72"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ7"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content-menu2">
              <div class="input">
                <p>
                  どの程度、<span class="blue-text">「おいしさ」</span>
                  を感じましたか？
                </p>
                <el-form-item prop="Q73">
                  <el-select
                    v-model="formData.Q73"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ7"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content-menu2">
              <div class="input">
                <p>
                  どの程度、
                  <span class="blue-text">「あなたにとって必要である」</span
                  >と感じましたか？
                </p>
                <el-form-item prop="Q74">
                  <el-select
                    v-model="formData.Q74"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ7"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content-menu2">
              <div class="input">
                <p>
                  どの程度、<span class="blue-text">「品質が良い」</span>
                  と感じましたか？
                </p>
                <el-form-item prop="Q75">
                  <el-select
                    v-model="formData.Q75"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ7"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Button Submit Form -->
          <el-form-item>
            <div class="btn-form btn-orange-main">
              <div class="border-input border-input-black">
                <el-button @click="resetForm('formData')" class="btn-black-main"
                  >戻る</el-button
                >
              </div>
              <div class="border-input">
                <el-button type="primary" @click="submitForm('formData')">
                  次へ
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
  name: "orderDetail",
  data() {
    return {
      listQ7: [
        "強く感じた",
        "少し感じた",
        "なんとも言えない",
        "あまり感じなかった",
        "全く感じなかった",
      ],
      formData: {
        question6: 0,
        Q71: "",
        Q72: "",
        Q73: "",
        Q74: "",
        Q75: "",
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
        Q71: [
          {
            required: true,
            message: "Q7を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        Q72: [
          {
            required: true,
            message: "Q7を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        Q73: [
          {
            required: true,
            message: "Q7を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        Q74: [
          {
            required: true,
            message: "Q7を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        Q75: [
          {
            required: true,
            message: "Q7を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  mounted() {
    if (sessionStorage.getItem("questionnaire2")) {
      this.formData = JSON.parse(sessionStorage.getItem("questionnaire2"));
    }
  },

  methods: {
    // Submit Form
    back() {
      this.$router.push({
        name: "menu-questionnaire1",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sessionStorage.setItem(
            "questionnaire2",
            JSON.stringify(this.formData)
          );
          this.$router.push({
            name: "menu-questionnaire3",
          });
        } else {
          return false;
        }
      });
    },
    // Reset Form
    resetForm(formName) {
      this.$refs[formName].resetFields();
      sessionStorage.removeItem("questionnaire2");
      this.$router.push({
        name: "menu-questionnaire1",
      });
    },
    RuleQ6(rule, value, callback) {
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
.back-btn {
  font-size: 44px;
}
.container-menu2 {
  margin: 45px 24px 94px 24px;
  padding-top: 0;
  .title {
    margin-bottom: 5px;
    background-color: #ffe9b8;
    margin: 0px -24px 7px -24px;
    padding: 3px 0px 3px 0px;
    text-align: center;
  }
  .label-menu2 {
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
  .mb-30 {
    margin-bottom: 30px !important;
  }
  .content-menu2 {
    .note {
      border: 3px solid #ffe9b8;
      margin-bottom: 17px;
      margin-top: 17px;
    }
    .fs-13 {
      font-size: 13px;
      margin-bottom: 23px;
    }
    .fs-12 {
      font-size: 12px !important;
    }
    .blue-text {
      color: #0008c4;
    }
    .red-text {
      color: #dc143c;
    }
    .text {
      margin-bottom: 10px;
      font-size: 16px;
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
.container-menu2 {
  .page-num {
    font-size: 16px;
  }
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
