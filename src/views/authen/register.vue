<template>
  <div>
    <div class="register">
      <!-- Form Register -->
      <div class="style-form">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          label-position="top"
          class="ruleForm"
          :validate-on-rule-change="true"
        >
          <!-- Name -->
          <el-form-item prop="name">
            <template #label>
              <span class="ttl">
                <span>お名前</span>
                <span class="require-field">必須</span>
              </span>
            </template>
            <el-input
              :class="
                nameError && !formData.name ? 'border-error' : 'border-suc'
              "
              type="text"
              v-model="formData.name"
              placeholder="例) 素直  太郎"
              autocomplete="off"
              maxlength="20"
            />
          </el-form-item>

          <!-- Phone -->
          <el-form-item prop="phone">
            <template #label>
              <span class="ttl">
                <span>お電話番号</span>
                <span class="require-field">必須</span>
              </span>
            </template>
            <el-input
              :class="
                phoneError && !formData.phone ? 'border-error' : 'border-suc'
              "
              v-model="formData.phone"
              placeholder="例）090-0000-0000"
              autocomplete="off"
              @input="formatPhone()"
            />
          </el-form-item>

          <!-- Email -->
          <el-form-item prop="email">
            <template #label>
              <span class="ttl">
                <span>メールアドレス</span>
                <span class="require-field">必須</span>
              </span>
            </template>
            <el-input
              :class="
                emailError && !formData.email ? 'border-error' : 'border-suc'
              "
              type="text"
              placeholder="例）sunao@example.com"
              v-model.trim="formData.email"
              maxlength="255"
              autocomplete="off"
            />
          </el-form-item>

          <!-- Birthday -->
          <el-form-item prop="birthday">
            <template #label>
              <span class="ttl">
                <span>生年月日</span>
                <span class="require-field">必須</span>
              </span>
            </template>
            <el-input
              :class="
                birthdayError && !formData.birthday
                  ? 'border-error'
                  : 'border-suc'
              "
              type="text"
              placeholder="例）2000/01/01"
              v-model="formData.birthday"
              autocomplete="off"
              :maxlength="10"
              @input="inputDateOfBirth()"
            />
          </el-form-item>
          <!-- Sex -->
          <el-form-item prop="sex">
            <template #label>
              <span class="ttl">
                <span>性別</span>
                <span class="require-field">必須</span>
              </span>
            </template>

            <div class="contclearfix">
              <el-radio-group v-model="formData.sex">
                <el-radio
                  label="1"
                  :class="
                    sexError && !formData.sex ? 'border-error' : 'border-suc'
                  "
                >
                  男性
                </el-radio>
                <el-radio
                  label="2"
                  :class="
                    sexError && !formData.sex ? 'border-error' : 'border-suc'
                  "
                >
                  女性
                </el-radio>
                <el-radio
                  label="3"
                  :class="
                    sexError && !formData.sex ? 'border-error' : 'border-suc'
                  "
                >
                  その他
                </el-radio>
                <el-radio
                  label="4"
                  :class="
                    sexError && !formData.sex ? 'border-error' : 'border-suc'
                  "
                >
                  回答しない
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <!-- Check Box -->
          <el-form-item prop="checkbox">
            <el-checkbox v-model="formData.checkbox" name="checkbox">
            </el-checkbox>
            <span class="agree"
              ><span class="fw-b" @click="dialogPrivacyPolicy = true"
                >「サービス規約」</span
              >に同意する</span
            >

            <div class="item-check-box">
              上記規約で引用している
              <span class="fw-b border-bottom" @click="routerPolicy()"
                >「プライバシーポリシー」</span
              >
              はこちら
            </div>
          </el-form-item>
          <el-form-item prop="checkbox2">
            <el-checkbox-group v-model="formData.checkbox2">
              <el-checkbox
                name="checkbox2"
                label="「会社への利用情報の提供について同意する"
              >
                <span class="checkboxTow"
                  >「会社への利用情報の提供について同意する
                </span>
              </el-checkbox>
            </el-checkbox-group>
            <div class="item-check-box mt--12">
              本アプリユーザー（以下「ユーザー」といいます。）は、当社がユーザーの所属企業（以下「所属企業」といいます。）に対し、所属企業が本サービスの利用状況の管理、健康施策の実施、ユーザーの健康管理・指導に利用する目的で、以下の個人情報を第三者提供することについて予め同意します。
            </div>
            <div class="item-check-box">
              (1) ユーザーが本アプリ登録時に記載した、以下の登録情報
              氏名、生年月日、所属企業名、所属事業所名、メールアドレス
            </div>
            <div class="item-check-box">
              (2)
              本アプリでのユーザーの購入履歴（購入日時、購入金額、購入商品等)
            </div>
          </el-form-item>

          <!-- Button Submit Form -->
          <el-form-item>
            <div class="btn-form btn-orange-main">
              <div class="border-input border-input-black">
                <el-button @click="backToRegistration()" class="btn-black-main">
                  キャンセル
                </el-button>
              </div>
              <div class="border-input">
                <el-button
                  type="primary"
                  :disabled="checkSubmit"
                  @click="submitForm('formData')"
                >
                  登 録
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
            :disabled="!checkBirthdayFlag"
            :class="!checkBirthdayFlag ? 'disabled-btn' : ''"
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

    <!-- Dialog Privacy Policy  -->
    <div class="privacy-policy">
      <el-dialog
        title="サービス規約"
        v-model="dialogPrivacyPolicy"
        width="90%"
        :show-close="false"
        top="8vh"
      >
        <div class="content-infomation">
          <ContentPrivacy />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              class="cancel btn--black"
              @click="isConfirmPrivacyPolicy(false)"
            >
              同意しない
            </el-button>
            <el-button @click="isConfirmPrivacyPolicy(true)">
              同意する
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ElMessage as Message } from "element-plus";
import ContentPrivacy from "@/views/mypage/contentPrivacy.vue";
export default {
  components: {
    ContentPrivacy,
  },
  data() {
    const regexJapan = (rule, value, callback) => {
      // const validate = /^([ぁ-んァ-ン一-龥]+\s)*([々〆〤ヶ]+\s)*[ぁ-んァ-ン一-龥]+$/;
      const validate = /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u;
      if (validate.test(value)) {
        callback();
      } else {
        callback("全角文字で入力してください。");
      }
    };
    const checkBl = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback("「サービス規約」にチェックが行われていません");
      }
    };
    const regexDateOfBirth = (rule, value, callback) => {
      const validateDate =
        /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/;
      if (this.checkYear || this.checkMonth || this.checkDay) {
        callback("生年月日を入力してください");
      }
      if (validateDate.test(value)) {
        callback();
      } else {
        callback("生年月日を入力してください");
      }
    };

    return {
      sexError: false,
      nameError: false,
      phoneError: false,
      emailError: false,
      birthdayError: false,
      selectDate: "",
      checkBirthdayFlag: true,
      currentDate: "",
      dateOptions: {
        step: 5,
        itemHeight: 40,
        formatter: ["YYYY", "MM", "DD"],
        type: "year-month-day",
        active: "active_err",
      },
      checkSubmit: false,
      dialogPrivacyPolicy: false,
      showDialogChoseDate: false,
      zipcode: null,
      numberValidateForm: {
        age: "",
      },
      formData: {
        name: null,
        phone: "",
        email: null,
        birthday: null,
        sex: null,
        checkbox: "",
        checkbox2: [],
      },
      checkDay: false,
      checkMonth: false,
      checkYear: false,
      rules: {
        name: [
          {
            required: true,
            message: "お名前を入力してください",
          },
          {
            validator: regexJapan,
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            required: true,
            message: "お電話番号を入力してください",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?:.{12}|.{13}|.{14})$/,
            message: "10文字〜12文字で入力してください。",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "メールアドレスを入力してください",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "正しいメールの形式を入力してください。",
          },
        ],
        birthday: [
          {
            required: true,
            pattern: /^[0-9]/,
            message: "生年月日を入力してください",
            trigger: ["blur", "change"],
          },
          { validator: regexDateOfBirth, trigger: ["blur", "change"] },
        ],
        sex: [
          {
            required: true,
            message: "性別を選択してください",
            trigger: ["blur", "change"],
          },
        ],
        checkbox: [
          {
            validator: checkBl,
            trigger: ["blur", "change"],
          },
        ],
        checkbox2: [
          {
            required: true,
            message:
              "「会社への利用情報の提供について」にチェックが行われていません",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  created() {
    this.currentDate = moment().format("YYYY/MM/DD");
  },

  methods: {
    checkDayFlag(day, month, year) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if (day > 31 || day < 1) {
            this.checkDay = true;
          } else {
            this.checkDay = false;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          if (day > 30 || day < 1) {
            this.checkDay = true;
          } else {
            this.checkDay = false;
          }
          break;
        case 2:
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            if (day > 29 || day < 1) {
              this.checkDay = true;
            } else {
              this.checkDay = false;
            }
          } else {
            if (day > 28 || day < 1) {
              this.checkDay = true;
            } else {
              this.checkDay = false;
            }
          }
          break;
        default:
          break;
      }
    },
    inputDateOfBirth() {
      var x = "";
      x = this.formData.birthday
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
      const now = moment().format("YYYY/MM/DD");
      const currentYear = parseInt(now.slice(0, 4));
      const currentMonth = parseInt(now.slice(5, 7));
      const currentDay = parseInt(now.slice(8, 10));
      const numberYear = parseInt(x[1]);
      const numberMonth = parseInt(x[2]);
      const numberDay = parseInt(x[3]);
      this.formData.birthday = !x[2]
        ? x[1]
        : x[1] + "/" + x[2] + (x[3] ? "/" + x[3] : "");
      if (numberYear < 1900 || numberYear > currentYear) {
        this.checkYear = true;
      } else {
        this.checkYear = false;
      }
      if (numberYear === currentYear) {
        if (numberMonth > currentMonth || numberMonth < 1 || numberMonth > 12) {
          this.checkMonth = true;
        } else if (numberMonth === currentMonth) {
          this.checkMonth = false;
          if (numberDay > currentDay || numberDay < 1) {
            this.checkDay = true;
          } else {
            this.checkDay = false;
          }
        } else if (numberMonth <= currentMonth && numberMonth >= 1) {
          this.checkMonth = false;
          this.checkDayFlag(numberDay, numberMonth, numberYear);
        }
      } else {
        if (numberMonth < 1 || numberMonth > 12) {
          this.checkMonth = true;
        } else {
          this.checkMonth = false;
          this.checkDayFlag(numberDay, numberMonth, numberYear);
        }
      }
      if (x[3].length === 2 && numberDay <= currentDay) {
        this.checkDay = false;
      } else if (x[3].length === 1) {
        this.checkDay = true;
      }
    },
    routerPolicy() {
      window.open(
        "https://www.glico.com/assets/files/sunaodelivery-policy.pdf"
      );
    },

    formatBirthday() {
      let x = "";
      x = this.formData.birthday
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
      this.formData.birthday = !x[2]
        ? x[1]
        : x[1] + "/" + x[2] + (x[3] ? "/" + x[3] : "");
    },

    formatPhone() {
      let x = "";
      if (this.formData.phone.length > 13) {
        x = this.formData.phone
          .replace(/\D/g, "")
          .match(/(\d{0,4})(\d{0,4})(\d{0,4})/);
      } else {
        x = this.formData.phone
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
      }
      this.formData.phone = !x[2]
        ? x[1]
        : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
    },
    // Show Calendar
    openCalendar() {
      this.checkBirthdayFlag = true;
      if (this.formData.birthday) {
        this.currentDate = this.formData.birthday;
      }
      this.showDialogChoseDate = true;
    },

    // Confirm Chose Date
    confirmDate() {
      if (!this.selectDate) {
        this.selectDate = this.currentDate;
      }
      this.formData.birthday = this.selectDate;
      this.showDialogChoseDate = false;
    },

    isConfirmPrivacyPolicy(value) {
      this.dialogPrivacyPolicy = false;
      if (value) {
        this.formData.checkbox = true;
      } else {
        this.formData.checkbox = false;
      }
    },

    // Triger Change Date
    dateChange(date) {
      const now = moment().format("YYYY/MM/DD");
      this.selectDate = date.replace(" 00:00", "").replace(/-/g, "/");
      let nowDate = new Date(now.replace(/-/g, "/"));
      let checkDate = new Date(this.selectDate.replace(/-/g, "/"));
      if (checkDate > nowDate) {
        this.checkBirthdayFlag = false;
        Message.closeAll();
        this.$message.error("正しい日付を入力してください。");
      } else {
        this.selectDate = date.replace(" 00:00", "").replace(/-/g, "");
        Message.closeAll();
        this.checkBirthdayFlag = true;
      }
    },

    // Submit Form
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sexError = false;
          (this.nameError = false),
            (this.phoneError = false),
            (this.emailError = false),
            (this.birthdayError = false),
            this.saveUser();
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName("is-error");
            isError[0].querySelector("input").focus();
          }, 200);
          if (!this.formData.sex) {
            this.sexError = true;
          } else {
            this.sexError = false;
          }
          if (!this.formData.name) {
            this.nameError = true;
          } else {
            this.nameError = false;
          }
          if (!this.formData.phone) {
            this.phoneError = true;
          } else {
            this.phoneError = false;
          }
          if (!this.formData.email) {
            this.emailError = true;
          } else {
            this.emailError = false;
          }
          if (!this.formData.birthday) {
            this.birthdayError = true;
          } else {
            this.birthdayError = false;
          }
          return false;
        }
      });
    },
    // Add User
    saveUser() {
      this.checkSubmit = true;
      setTimeout(() => {
        this.checkSubmit = false;
      }, 1000);
      const openid = localStorage.getItem("openId");
      const data = {
        openId: openid,
        personName: this.formData.name,
        userPhone: this.formData.phone,
        userMail: this.formData.email,
        birthday: this.formData.birthday,
        sex: this.formData.sex,
      };
      this.$post("/customerinfo/addTPartnerUser", data).then((response) => {
        if (response.code == "200") {
          this.checkPartnerUser(openid)
          this.$router.push({
            name: "order",
          });
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    async checkPartnerUser(openid) {
      try {
        const storeId = localStorage.getItem("storeId");
        const res = await this.$post("/customerinfo/getTPartnerUser", {
          openId: openid,
          storeId: storeId,
        });
        localStorage.setItem("getTPartnerUser", JSON.stringify(res.data.userId));
      } catch (error) {
        const msgError = error.response.data.msg || "ERROR"
        this.$message.error(msgError)
      }
    },
    // Back To Registration
    backToRegistration() {
      this.$router.push({ name: "new-delivery-address" });
    },
  },
};
</script>

<style lang="scss">
.register {
  margin-top: 94px;
  margin-bottom: 100px;
  .agree {
    color: #3c0200;
    font-size: 16px;
    width: 200px;
    height: 50px;
    position: relative;
    z-index: 1;
  }

  .agree:before {
    content: "";
    position: absolute;
    left: 9px;
    bottom: -6px;
    height: 1px;
    width: 54%;
    border-bottom: 1px solid #3c0200;
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
}
.style-form {
  .el-form-item__label {
    padding: 0 !important;
    font-size: 17px;
    color: #3c0200;
    .ttl {
      display: flex;
      align-items: center;
    }
  }
  .text-check-box {
    margin-top: 12px;
    color: #3c0200;
  }
  .item-check-box {
    color: #3c0200;
    font-size: 16px;
    padding-left: 33px;
    line-height: 29px;
  }
  .checkboxTow {
    color: #3c0200;
    font-size: 16px;
  }
  .el-form-item__label:before {
    content: "" !important;
    margin-right: 0 !important;
  }
  .border-error {
    .el-radio__label {
      border: 1px solid #dc1400 !important;
    }
    .el-input__inner {
      border: 1px solid #dc1400 !important;
    }
  }
  .el-input__inner {
    border-radius: 6px;
    font-size: 16px;
    color: #3c0200;
    height: 33px;
    line-height: 33px;
    border-color: #3c0200 !important;
  }
  .el-form-item__error {
    color: #dc1400;
  }
  ::placeholder {
    color: #af9a69;
    opacity: 1;
  }
  .el-radio-group {
    width: 100%;
    .el-radio {
      color: #3c0200;
      display: inline-block;
      width: 50%;
      margin-right: 0;
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        border: 1px solid #3c0200;
        border-radius: 17px;
        height: 33px;
        padding-top: 7.5px;
        padding-bottom: 7.5px;
        text-align: center;
        font-size: 14px;
        display: block;
        gap: 20px;
        margin-top: 10px;
        font-weight: 400;
        padding-left: 0;
      }
    }
    .el-radio:nth-child(2n-1) {
      .el-radio__label {
        margin-right: 10px;
      }
    }
    .el-radio:nth-child(2n) {
      .el-radio__label {
        margin-left: 10px;
      }
    }
    .el-radio__input.is-checked + .el-radio__label {
      background: #ffe9b8;
      color: #3c0200;
    }
  }
}
</style>

<style lang="less" scoped>
.yzmsg {
  font-size: 12px;
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
  // font-weight: 700;
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
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
<style lang="scss">
.privacy-policy {
  .content-infomation {
    max-height: calc(100vh - 275px);
    overflow: auto;
    margin: 0px -15px;
    padding: 0px 15px;
  }
  .el-dialog {
    border-radius: 20px;
    border: 0px;
    background: #ffff;
    .btn--black {
      background-color: #3c0200;
      border: 1px solid #3c0200;
      color: #ffff;
    }
    .el-dialog__header {
      padding: 20px 0px;
      text-align: center;
    }
    .el-dialog__body {
      background: #ffff;
      padding: 0px 15px;
      color: #3c0200;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-between;
    }
    .el-dialog__footer {
      padding: 10px 10px 15px;
    }

    .dialog-footer .el-button {
      width: 47%;
      border-radius: 23px;
      height: 43px;
      padding: 0px;
    }
  }
}
</style>

