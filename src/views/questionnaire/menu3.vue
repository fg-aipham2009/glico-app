<template>
  <div>
    <!-- <div class="arror-left back-btn" @click="back()">
      <i class="el-icon-arrow-left"></i>
    </div> -->
    <div class="container-menu3">
      <div class="questionneaire-menu3">
        <div class="text-center page-num">
          <p>3 / 3 ページ</p>
        </div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          label-position="top"
        >
          <!-- Q8. -->
          <div class="question">
            <div class="label-menu3">Q8.</div>
            <div class="content-menu3">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、
                <span class="red-text">価格</span>
                についてはどう思いましたか。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question8">
                  <el-select
                    v-model="formData.question8"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ8"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q9. -->
          <div class="question">
            <div class="label-menu3">Q9.</div>
            <div class="content-menu3">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、
                <span class="red-text">価格に見合った価値</span>
                についてどのように思いますか。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question9">
                  <el-select
                    v-model="formData.question9"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ9"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q10. -->
          <div class="question">
            <div class="label-menu3">Q10.</div>
            <div class="content-menu3">
              <div class="text">
                [Q1回答メニュー]を召しあがってみて、
                <span class="red-text">中身</span>
                について、どのように思いましたか。(ひとつだけ)
              </div>
              <div class="input">
                <el-form-item prop="question10">
                  <el-select
                    v-model="formData.question10"
                    style="width: 100%"
                    placeholder="選択してください"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in listQ10"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- Q11. -->
          <div class="question">
            <div class="label-menu3">Q11.</div>
            <div class="content-menu3">
              <div class="text">
                「SUNAOランチ」についてご要望などありましたら、どんなことでも構いませんので、ご自由にお書きください。
              </div>
              <div class="input">
                <el-form-item prop="question11">
                  <el-input
                    type="text"
                    v-model.number="formData.question11"
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
                  >戻る</el-button
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
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="confirmDate()"
            size="default"
            :disabled="!checkQ1Flag"
          >
            確 定
          </el-button>
          <el-button
            type="primary"
            @click="showDialogChoseDate = false"
            size="default"
          >
            キャンセル
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "menu3",
  data() {
    return {
      listQ8: [
        "とても安い",
        "まあ安い",
        "ふつう",
        "ちょっと高い",
        "とても高い",
      ],
      listQ9: [
        "価格に見合った価値がとてもある",
        "価格に見合った価値がある",
        "ふつう",
        "価格に見合った価値があまりない",
        "価格に見合った価値が全くない",
      ],
      listQ10: ["大好き", "少し好き", "ふつう", "あまり好きではない", "嫌い"],
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
        question8: "",
        question9: "",
        question10: "",
        question11: "",
      },

      rules: {
        question8: [
          {
            required: true,
            message: "Q8を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question9: [
          {
            required: true,
            message: "Q9を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
        question10: [
          {
            required: true,
            message: "Q10を回答ください。",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  methods: {
    back() {
      this.$router.push({
        name: "menu-questionnaire2",
      });
    },

    // Show Calendar
    openCalendar() {
      this.checkQ1Flag = true;
      if (this.formData.Q1) {
        this.currentDate = this.formData.Q1;
      }
      this.showDialogChoseDate = true;
    },

    // Confirm Chose Date
    confirmDate() {
      if (!this.selectDate) {
        this.selectDate = this.currentDate;
      }
      this.formData.Q1 = this.selectDate;
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
          let questionnaire1;
          let questionnaire2;
          try {
            questionnaire1 = JSON.parse(
              sessionStorage.getItem("questionnaire1") || "null"
            );
            questionnaire2 = JSON.parse(
              sessionStorage.getItem("questionnaire2") || "null"
            );
          } catch (e) {
            this.$message.error("ERROR");
            return;
          }
          if (!questionnaire1 || !questionnaire2) {
            this.$message.error("ERROR");
            return;
          }
          questionnaire2 = {
            question6: questionnaire2.question6,
            question7: `${questionnaire2.Q71},${questionnaire2.Q72},${questionnaire2.Q73},${questionnaire2.Q74},${questionnaire2.Q75}`,
          };
          const data = {
            openId: localStorage.getItem("openId"),
            questionType: "menu-question",
            questionName: "メニューアンケート",
            ...questionnaire1,
            ...questionnaire2,
            ...this.formData,
          };
          this.$post("/feedback/addFeedback", data)
            .then((response) => {
              if (response.code == 200 || response.code === "200") {
                this.$router.push({
                  name: "questionnaire-completed",
                });
                sessionStorage.removeItem("questionnaire1");
                sessionStorage.removeItem("questionnaire2");
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
      sessionStorage.removeItem("questionnaire3");
      this.$router.push({
        name: "menu-questionnaire2",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.back-btn {
  font-size: 44px;
}
.container-menu3 {
  margin: 45px 24px 94px 24px;
  padding-top: 0;

  .page-num {
    font-size: 16px;
  }
  .title {
    margin-bottom: 5px;
    background-color: #ffe9b8;
    margin: 0px -24px 7px -24px;
    padding: 3px 0px 3px 0px;
    text-align: center;
  }
  .label-menu3 {
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
  .content-menu3 {
    .note {
      border: 3px solid #ffe9b8;
      margin-bottom: 17px;
      margin-top: 17px;
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
:deep(.picker_panel) {
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
:deep(.dialog-footer .el-button--primary) {
  color: #fff;
  background-color: #3c0200;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}
:deep(.dialog-footer .el-button--default) {
  color: #fff;
  background-color: #ff7101;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}
:deep(.el-dialog__footer) {
  padding: 0;
}
:deep(.dialog-footer) {
  width: 100%;
  font-size: 0;
  .is-disabled {
    background: #717171 !important;
  }
}
:deep(.dialog-footer .el-button + .el-button) {
  margin-left: 0;
}
:deep(.dialog-footer .el-button) {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}
:deep(.el-dialog__body) {
  background: #fffcee;
  border-radius: 5px;
}
</style>

