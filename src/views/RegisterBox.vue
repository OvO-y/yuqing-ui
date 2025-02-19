<template>
  <div class="back">
    <div class="AllContainer">
      <div class="LeftContainer">
        <div class="LeftTop">
          <div class="TopImg">
            <img src="../assets/全球logo.png">
            <p style="padding-left: 30px">舆情数据分析</p>
          </div>
        </div>
        <div class="BackImg">
          <img src="../assets/img2.jpg" style="width: 100%;height: 100%">
          <img src="../assets/线条.png" style="position: absolute;
    width: 300px;
    height: 550px;
    left: 9px;
    bottom: 49px;
    opacity: 0.4;
}">
          <img src="../assets/递增箭头.png" style="position: absolute;
    width: 250px;
    height: 300px;
    right: 9px;
    bottom: 15px;">
          <img src="../assets/球状线路.png" style="position: absolute;
    width: 250px;
    height: 250px;
    right: 9px;
    top: 9px;opacity: 0.6">
        </div>
      </div>
      <div class="RightContainer">
        <div class="FormBox">
          <form id="RegisterForm" action="">
            <h2 style="margin-bottom: 0;">账号注册</h2>
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
            >
              <!--            <el-form-item  label-position="left" >-->
              <!--              <h3>选择注册方式</h3>-->
              <!--            </el-form-item>-->
              <!--            <el-form-item class="choice-box" >-->
              <!--              <div style="display: flex;flex-direction: row;width: 100%;-->
              <!--    justify-content: space-between;">-->
              <!--              </div>-->
              <!--            </el-form-item>-->
              <div class="UlBox">
                <ul class="loginUl">
                  <li @click="changeMethod('email')">
                    <el-icon :size="size" :color="color">
                      <Message/>
                    </el-icon>
                  </li>
                  <li @click="changeMethod('phone')">
                    <el-icon :size="size" :color="color">
                      <Cellphone/>
                    </el-icon>
                  </li>
                </ul>
              </div>
              <el-form-item label="手机号码" v-if="method === 'phone'" prop="phone" label-width="100px"
                            label-position="left" class="el-input">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" prefix-icon="Cellphone" clearable/>
              </el-form-item>
              <el-form-item label="邮箱" v-if="method === 'email'" prop="email" label-width="100px" label-position="left"
                            class="el-input">
                <el-input v-model="ruleForm.phone" placeholder="请输入邮箱" prefix-icon="Message" clearable/>
              </el-form-item>
              <el-form-item label="账号名称" prop="name" label-width="100px" label-position="left"
                            style="font-size: 18px">
                <el-input style="height: 35px;" v-model="ruleForm.name" placeholder="请输入账号名称" prefix-icon="User"
                          autocomplete="off"/>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="100px" label-position="left">
                <el-input v-model="ruleForm.password"
                          style="width: 100%"
                          type="password"
                          placeholder="请输入密码"
                          prefix-icon="Lock"
                          show-password
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword" label-width="100px" label-position="left">
                <el-input v-model="ruleForm.repassword"
                          style="width: 100%"
                          type="password"
                          placeholder="请确认密码"
                          prefix-icon="Lock"
                          show-password
                />
              </el-form-item>
              <el-form-item label="验证码" label-width="100px" label-position="left">
                <el-input v-model="identifyMode" placeholder="请输入验证码" clearable/>
                <div class="code" @click="refreshCode">
                  <SIdentify :identifyCode="identifyCode"></SIdentify>
                </div>
              </el-form-item>
              <el-form-item style="width: 100%;justify-content: space-between;}">
                <div style="width: 100%;display:flex;justify-content: space-between;
}">
                  <el-button type="primary" class="registerBtn" @click="submitForm(ruleFormRef)">确定</el-button>
                  <el-button style="width: 45%" @click="resetForm(ruleFormRef)">重置</el-button>
                </div>

              </el-form-item>
            </el-form>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import SIdentify from '@/components/Sidentify'

// 获取路由器
const identifyMode = ref('') // 输入框验证码
const identifyCode = ref('') // 图形验证码
const identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz') // 验证码出现的数字和字母
const ruleForm = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  repassword: ''
})

// 定义一个引用，用于引用表单实例
const ruleFormRef = ref(null)
const method = ref('phone')

function changeMethod (me) {
  method.value = me
}

// 验证账号名称
const validateName = function (rule, value, callback) {
  if (value === '') {
    callback(new Error('Please input the name'))
  } else {
    console.log(value)
    callback()
  }
}
// 验证手机号的函数
const validatePhone = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('Please input the phone'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}
// 验证邮箱的函数
const validateEmail = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('Please input the email'))
  }
  setTimeout(() => {
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback(new Error('Please input the right email'))
    }
  }, 1000)
}

// 验证密码的函数
const validatePassword = function (rule, value, callback) {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.repassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('repassword')
    }
    callback()
  }
}

// 再次验证密码的函数
const validateRepassword = function (rule, value, callback) {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.password) {
    callback(new Error('Two inputs don\'t match!'))
  } else {
    callback()
  }
}

// 存储表单验证规则的响应式对象
const rules = reactive({
  name: [{
    validator: validateName,
    trigger: 'blur'
  }],
  phone: [{
    validator: validatePhone,
    trigger: 'blur'
  }],
  email: [{
    validator: validateEmail,
    trigger: 'blur'
  }],
  password: [{
    validator: validatePassword,
    trigger: 'blur'
  }],
  repassword: [{
    validator: validateRepassword,
    trigger: 'blur'
  }]
})

// 提交表单的函数
const submitForm = function (formEl) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (identifyCode.value !== identifyMode.value) {
        alert('验证码错误')
        return
      }
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

// 重置表单的函数
const resetForm = function (formEl) {
  if (!formEl) return
  formEl.resetFields()
}
// 组件挂载
onMounted(() => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
})

// 验证码函数
// 生成随机数
const randomNum = (min, max) => {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min)
}
// 随机生成验证码字符串
const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)]
  }
}
// 更新验证码
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
// 表单验证
</script>

<style scoped>
.back {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 95vh;
  width: 100%;
  background: linear-gradient(to right, #0048cf, #4ba1fa);
}
.AllContainer {
  height: 82%;
  width: 72%;
  display: flex;
  flex-direction: row;
  margin: -8px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 10px 10px 8px #4987e1,
  -5px -5px 10px rgba(73, 135, 225, 0.5); /* 叠加多个阴影 */
}

.LeftContainer {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.LeftTop {
  width: 100%;
  /*height: 10%;*/
  background: #fafbfb;
}

.TopImg {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 10px;
}

.TopImg img {
  width: 40px;
  height: 40px;
  margin: 10px 0px 10px 5px;
}

.TopImg p {
  color: white;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
}

.BackImg {
  width: 100%;
  height: 100%;
  background: #fafbfb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.BackImg img {
  /*width: 50%;*/
  /*height: 55%;*/
  width: 100%;
  height: 100%;
}

.RightContainer {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.FormBox {
  width: 75%;
  height: 90%;
  background: #f9f9f9;
  /*padding: 10px;*/
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;

}

#RegisterForm {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loginUl {
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  height: 33px;
  padding: 0;
  border: 0;
  outline: none;
  font-weight: 400;
  vertical-align: baseline;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.loginUl li {
  background: white;
  width: 45%;
  display: flex;
  /*border: 1px solid cornflowerblue;*/
  border: 1px solid #c6e2ff;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 2px;
}

.loginUl li:hover {
  background: #ecf5ff;
  border: 1px solid #c6e2ff;
  color: #409eff;
}

.loginUl li el-icon svg:hover {
  color: #409eff;
}

.UlBox {
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  box-sizing: border-box;
  /* padding: 15px; */
  /* margin: 0 14px; */
  display: flex;
  flex-flow: row;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
}

.el-form-item__content {
  justify-content: center;
}

.el-form--inline .el-form-item {
  width: 70%;
  margin-right: 0;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.el-input {
  height: 35px;
}

.el-form--inline .el-form-item label {
  width: 100px;
  font-size: 20px;
}

.el-form-item__label {
  font-size: 18px;
}

.code {
  margin-top: 10px;
}

.registerBtn {
  width: 45%;
}
</style>
