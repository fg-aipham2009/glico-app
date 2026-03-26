<template>
  <div>
    <div class="container-menu1">
      <div class="questionneaire-menu1">
        <div class="text-center page-num">
          <p>1 / 3 ページ</p>
        </div>
        <div class="title fw-b">
          <p>「SUNAOランチ」について</p>
          <p>お声をお聞かせください</p>
        </div>
        <div class="content-menu1">
          <div class="text-center note">
            <p class="fs-15">※質問は全部で11問あります</p>
            <p class="fs-15">回答時間は5分程度です</p>
          </div>
          <p class="fs-13">
            この度は、「SUNAOランチ」を購入くださりありがとうございました。よりご満足頂ける商品づくりに活かすため、以下のアンケートにて率直な意見をお聞かせください！※「SUNAOランチ」をお召しあがり頂いたあとでお答えください。※アンケートの回答は、必ずあなたご自身のご意見をお答えください。
          </p>
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
            <div class="label-menu1">Q1.</div>
            <div class="content-menu1">
              <div class="text">
                お召しあがり頂いたのは、どのメニューですか。
              </div>
              <div class="input">
                <el-form-item prop="question1">
                  <!-- <el-input
                    type="text"
                    placeholder="例）2000/01/01"
                    @focus="openCalendar()"
                    v-model.number="formData.question1"
                    autocomplete="off"
                    readonly
                    class="custom-input"
                  /> -->
                  <el-date-picker
                    type="date"
                    format="yyyy/MM/dd"
                    placeholder="例）2000/01/01"
                    autocomplete="off"
                    v-model="formData.question1"
                  >
                  </el-date-picker>
                  <!-- <el-input
                    type="text"
                    placeholder="回答を記入してください"
                    v-model.number="formData.question1"
                    autocomplete="off"
                    class="custom-input"
                  /> -->
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q2. -->
          <div class="question">
            <div class="label-menu1">Q2.</div>
            <div class="content-menu1">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、
                <span class="red-text">良い</span>
                と思われた点についてできるだけ具体的にお書きください。
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
            <div class="label-menu1">Q3.</div>
            <div class="content-menu1">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、<span class="blue-text"
                  >良くない</span
                >と思われた点についてできるだけ具体的にお書きください。
              </div>
              <div class="input">
                <el-form-item prop="question3">
                  <el-input
                    type="text"
                    v-model.number="formData.question3"
                    placeholder="回答を記入してください"
                    autocomplete="off"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q4. -->
          <div class="question">
            <div class="label-menu1">Q4.</div>
            <div class="content-menu1">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、また買いたいと思いますか。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question4">
                  <el-select
                    v-model="formData.question4"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ4"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q5. -->
          <div class="question">
            <div class="label-menu1">Q5.</div>
            <div class="content-menu1">
              <div class="text">
                Q4のようにお答えになった理由を、できるだけ具体的にお書きください。
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
    <!-- Dialog Chose Date -->
    <el-dialog
      v-model="showDialogChoseDate"
      width="90%"
      :show-close="false"
      center
    >
      <el-date-picker
        v-model="currentDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY/MM/DD"
        placeholder="日付を選択"
        style="width: 100%"
        @change="dateChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="confirmDate()"
          size="medium"
          :disabled="!checkQ1Flag"
        >
          確 定
        </el-button>
        <el-button
          type="primary"
          @click="showDialogChoseDate = false"
          size="medium"
        >
          キャンセル
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { ElMessage as Message } from "element-plus";
export default {
  name: "orderDetail",
  components: {},
  data() {
    return {
      listQ4: [
        "ぜひ買いたい",
        "買いたいと思う",
        "気が向けば買ってもよい",
        "あまり気が進まない",
        "買いたくない",
        "わからない",
      ],
      selectDate: "",
      checkQ1Flag: true,
      currentDate: moment().format("YYYY/MM/DD"),
      dateOptions: {
        step: 5,
        itemHeight: 40,
        formatter: ["YYYY", "MM", "DD"],
        type: "year-month-day",
        active: "active_err",
      },
      showDialogChoseDate: false,
      formData: {
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
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
            // required: true,
            message: "Q2を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question3: [
          {
            // required: true,
            message: "Q3を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question4: [
          {
            required: true,
            message: "Q4を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question5: [
          {
            // required: true,
            message: "Q5を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  mounted() {
    this.$parent.changeTabBarCss(0);
    if (sessionStorage.getItem("questionnaire1")) {
      this.formData = JSON.parse(sessionStorage.getItem("questionnaire1"));
    }
  },

  methods: {
    // Show Calendar
    openCalendar() {
      this.checkQ1Flag = true;
      if (this.formData.question1) {
        this.currentDate = this.formData.question1;
      }
      this.showDialogChoseDate = true;
    },

    // Confirm Chose Date
    confirmDate() {
      if (!this.selectDate) {
        this.selectDate = this.currentDate;
      }
      this.formData.question1 = this.selectDate;
      this.showDialogChoseDate = false;
    },

    // Triger Change Date
    dateChange(date) {
      const now = moment().format("YYYY/MM/DD");
      this.selectDate = date.replace(" 00:00", "").replace(/-/g, "/");
      let nowDate = new Date(now.replace(/-/g, "/"));
      let checkDate = new Date(this.selectDate.replace(/-/g, "/"));
      //   if (checkDate > nowDate) {
      //     this.checkQ1Flag = false;
      //     Message.closeAll();
      //     this.$message.error("正しい日付を入力してください。");
      //   } else {
      //     Message.closeAll();
      //     this.checkQ1Flag = true;
      //   }
    },

    // Submit Form
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const q1 = this.formData.question1;
          this.formData.question1 = moment(q1).format("yyyy/MM/DD");
          sessionStorage.setItem(
            "questionnaire1",
            JSON.stringify(this.formData)
          );
          console.log("==>", JSON.stringify(this.formData));
          this.$router.push({
            name: "menu-questionnaire2",
          });
        } else {
          return false;
        }
      });
    },
    // Reset Form
    resetForm(formName) {
      this.$refs[formName].resetFields();
      sessionStorage.removeItem("questionnaire1");
      this.$router.push({
        name: "order-detail",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container-menu1 {
  margin: 45px 24px 94px 24px;
  padding-top: 0;
  .page-num {
    font-size: 16px;
  }
  .title {
    line-height: 17px;
    padding: 10px 0px;
    // margin-bottom: 5px;
    background-color: #ffe9b8;
    margin: 0px -24px 7px -24px;
    // padding: 3px 0px 3px 0px;
    text-align: center;
  }
  .label-menu1 {
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
  .content-menu1 {
    .note {
      line-height: 17px;
      padding: 4px 0px;
      border: 3px solid #ffe9b8;
      margin-bottom: 17px;
      margin-top: 17px;
      font-weight: 600;
    }
    .fs-13 {
      font-size: 13px;
      margin-bottom: 23px;
    }
    .fs-15 {
      font-size: 15px;
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
::v-deep .picker_panel {
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 140px !important;
  position: relative;
  .mask {
    position: absolute;
    width: 100%;
    height: 60px;
    /*background-color: #ffffff;*/
    /*opacity: 0.5;*/
    pointer-events: none;
    z-index: 10;
    &_top {
      top: 0;
      // background: linear-gradient(to top, rgba(255, 255, 255, 0.5), #ffffff);
    }
    &_bottom {
      bottom: -2px;
      // background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), #ffffff);
    }
  }
  .picker_axis {
    height: 100%;
    overflow: hidden;
    min-width: 50px;
    ul {
      margin: 0;
      padding: 0 10px;
      margin-top: -29px;
      li {
        list-style: none;
        line-height: 30px;
        color: #af9a69;
        font-size: 20px;
        user-select: none;
        min-width: 60px;
        text-align: center;
      }
      .active_date {
        /*color: #333333;*/
        font-size: 20px;
        line-height: 40px;
        border-top: 1px solid #3c0200;
        border-bottom: 1px solid #3c0200;
        font-weight: 500;
        color: #3c0200;
      }
    }
  }
}
::v-deep .dialog-footer .el-button--primary {
  color: #fff;
  background-color: #3c0200;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}
::v-deep .dialog-footer .el-button--default {
  color: #fff;
  background-color: #ff7101;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}
::v-deep .el-dialog__footer {
  padding: 0;
}
::v-deep .dialog-footer {
  width: 100%;
  font-size: 0;
  .is-disabled {
    background: #717171 !important;
  }
}
::v-deep .dialog-footer .el-button + .el-button {
  margin-left: 0;
}
::v-deep .dialog-footer .el-button {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}
::v-deep .el-dialog__body {
  background: #fffcee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>

