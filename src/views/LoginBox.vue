<template>
  <div class="back">
    <div class="AllContainer">
      <div class="LeftContainer">
        <div class="LeftTop">
          <div class="TopImg">
            <!--            <img src="../assets/favicon.png">-->
            <img src="../assets/全球logo.png">
            <p style="padding-left: 30px">舆情数据分析</p>
          </div>
        </div>
        <div class="BackImg">
          <img src="../assets/彩色云端.jpg" style="width: 100%;height: 100%">
          <img src="../assets/线条.png" style="position: absolute;
    width: 300px;
    height: 550px;
    left: 9px;
    bottom: 49px;
    opacity: 0.4;
}">
          <img src="../assets/蓝色人.png" style="position: absolute;
    width: 250px;
    height: 300px;
    right: 9px;
    bottom: 15px;">
          <img src="../assets/右上角.png" style="position: absolute;
    width: 250px;
    height: 250px;
    right: 9px;
    top: 9px;opacity: 0.6">

        </div>
      </div>
      <div class="RightContainer">
        <div class="FormBox">
          <form id="LoginForm" action="">
            <h2>用户登录
            </h2>
            <div class="UlBox">
              <ul class="loginUl">
                <li @click="changeLoginMethod('account')" :class="{ active: loginMethod === 'account'}">账号登录
                </li>
                <li @click="changeLoginMethod('phone')" :class="{ active: loginMethod === 'phone'}">短信登录
                </li>
                <li @click="changeLoginMethod('weixin')" :class="{ active: loginMethod === 'weixin'}"> 微信登录
                </li>
              </ul>
            </div>
            <!--            <img src="../assets/箭头.png" style="position: absolute;-->
            <!--    width: 250px;-->
            <!--    height: 300px;-->
            <!--    right: 9px;-->
            <!--    bottom: 15px;">-->

            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
            >
              <el-form-item prop="phone" v-if="loginMethod === 'phone'|| loginMethod === 'account'"
                            class="PhoneWordBox">
                <el-input style="height: 40px;" v-model="ruleForm.phone" placeholder="请输入手机号/邮箱/账号"
                          prefix-icon="User" clearable/>
              </el-form-item>
              <el-form-item prop="password" v-if=" loginMethod === 'account'" class="PhoneWordBox">
                <el-input v-model="ruleForm.password"
                          style="width: 100%;height: 40px;margin: 10px 0px 10px 0px;"
                          type="password"
                          placeholder="请输入密码"
                          prefix-icon="Lock"
                          show-password
                />
              </el-form-item>
              <div v-if="loginMethod === 'phone'" class="PhoneWordBox">
                <el-input class="PhoneWordInput" v-model="validword" style="width: 240px" placeholder="请输入验证码 "
                          clearable/>
                <button>发送验证码</button>
              </div>
              <div v-if="loginMethod === 'weixin'">
                <img class="wxImg" src="../assets/wxcode.png">
              </div>
              <div style="display: flex;margin: 20px;">
                <div>还没账号？去<span style="color: #42b983;cursor: pointer">注册</span></div>
                <div style="text-align: right;flex: 1;color: #42b983;cursor:pointer;">忘记密码</div>
              </div>
              <div v-if="loginMethod === 'account' || loginMethod === 'phone'||loginMethod === 'weixin'">
                <el-button type="primary" id="LoginBtn" @click="Login(ruleFormRef)">登录</el-button>
              </div>
            </el-form>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import axios from 'axios'

// 定义一个引用，用于引用表单实例
const ruleFormRef = ref(null)

// 验证手机号的函数
const validatePhone = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('Please input the phone'))
  }
  // 使用正则表达式检查是否为纯数字且长度为 11 位（中国大陆手机号长度）
  const phoneRegex = /^[0-9]{11}$/
  if (!phoneRegex.test(value)) {
    callback(new Error('Please input a valid 11-digit phone number'))
  } else {
    callback()
  }
}
// 验证密码的函数
const validatePassword = function (rule, value, callback) {
  if (value === '') {
    callback(new Error('Please input the password'))
  }
  // 使用正则表达式检查是否包含大小写字母和数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('Password must contain at least one uppercase letter, one lowercase letter and one number'))
  } else {
    callback()
  }
}
// 新增验证验证码的函数开始
const validateCode = function (rule, value, callback) {
  if (!value) {
    alert('请输入验证码')
    return callback(new Error('请输入验证码'))
  }
  // 使用正则表达式检查是否为 6 位数字
  const codeRegex = /^[0-9]{6}$/
  if (!codeRegex.test(value)) {
    callback(new Error('验证码位6位数字'))
  } else {
    callback()
  }
}
// 存储表单验证规则的响应式对象
const rules = reactive({
  phone: [{
    validator: validatePhone,
    trigger: 'blur'
  }],
  password: [{
    validator: validatePassword,
    trigger: 'blur'
  }],
  // 新增验证码的验证规则
  code: [{
    validator: validateCode,
    trigger: 'blur'
  }]
})
// 定义 loginMethod 为响应式变量，默认值为 'account'
const loginMethod = ref('account')
// 定义响应式变量
const validword = ref('')

const ruleForm = reactive({
  phone: '',
  password: ''
})

// 定义 changeLoginMethod 方法来改变 loginMethod 的值
function changeLoginMethod (method) {
  loginMethod.value = method
}

// 提交表单的函数
const Login = async function (formEl) {
  if (!formEl) return
  try {
    const valid = await formEl.validate()
    if (valid) {
      if (loginMethod.value === 'phone') {
        // 对验证码验证使用 Promise 处理
        await new Promise((resolve, reject) => {
          validateCode(null, validword.value, (error) => {
            if (error) {
              reject(error)
            } else {
              resolve()
            }
          })
        })
        console.log(' phone submit!')
        alert('phone submit!')
        alert(ruleForm.phone)
        const response = await axios.post('http://localhost:8084/phonelogin', {
          telephone: ruleForm.phone
        })
        console.log('Request sent successfully')
        console.log('Response data:', response.data)
        console.log('Account from response:', response.data.account)
        console.log('Final response log')
      } else if (loginMethod.value === 'account') {
        console.log(' account submit!')
        alert('account submit!')
        alert(ruleForm.phone)
        alert(ruleForm.password)
        await axios.post('http://localhost:8084/accountlogin', {
          account: ruleForm.phone,
          password: ruleForm.password
        })
        // console.log('Request sent successfully')
        // console.log('Response data:', response.data)
        // console.log('Account from response:', response.data.account)
        // console.log('Final response log')
      } else {
        console.log('error submit!')
      }
    } else {
      console.log('表单验证失败')
    }
  } catch (error) {
    // 更友好的错误提示方式，可替换为 Vue 消息组件
    alert(`登录时发生错误: ${error.message}`)
  }
}
// 监听 loginMethod 的变化，可以在这里处理不同登录方式的逻辑
watch(loginMethod, (method) => {
  console.log(`登录方式已更改为：${method}`)
  // 这里可以根据 newVal 执行不同的逻辑
})
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

.UlBox {
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  box-sizing: border-box;
  padding: 15px;
  /* margin: 0 14px; */
  display: flex;
  flex-flow: row;
}

.FormBox {
  width: 75%;
  height: 75%;
  background: #f9f9f9;
  /*padding: 10px;*/
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;

}

#LoginForm {
  width: 78%;
}

.loginUl {
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  margin: 0 5px 10px 5px;
  padding: 0;
  border: 0;
  outline: none;
  font-weight: 400;
  vertical-align: baseline;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.loginUl :hover {
  color: #409eff;
  border-bottom: #409eff 2px solid;
}

.loginUl li {
  transition: color 0.3s ease,
  transform 0.2s ease;
}

.loginUl li:hover {
  transform: translateY(-2px); /* 悬停时轻微上移 */
}

.active {
  color: #409eff;
  border-bottom-color: #409eff;
  animation: pulse 1s ease; /* 激活时呼吸效果 */
}

@keyframes pulse {
  0% {
    opacity: 0.8
  }
  50% {
    opacity: 1
  }
  100% {
    opacity: 0.8
  }
}

.InputBox {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  flex-direction: row;
}

.InputBox input {
  width: 100%;
  height: 35px;
  margin: 10px 0;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px grey solid;
  font-size: 15px;
}

.form-input {
  width: 100%;
  height: 35px;
  margin: 10px 0;
  padding: 0 0px;
  font-size: 15px;
}

#LoginBtn {
  width: 88%;
  /*height: 40px;*/
  /*margin: 10px 0px;*/
  /*padding: 0px 22px;*/
  /*border-radius: 3px;*/
  /*border: none;*/
  /*font-size: 15px;*/
  /*background: #4285f4;*/
  /*color: white;*/
}

.PhoneWordBox {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  flex-direction: row;
}

.PhoneWordInput {
  width: 50%;
  height: 40px;
  margin: 10px 0px 10px 0px;

  font-size: 15px;
  box-sizing: border-box;
  padding-right: 10px;
}

.PhoneWordBox button {
  width: 50%;
  height: 40px;
  margin: 10px 0px;
  padding: 0px;
  border-radius: 3px;
  border: none;
  font-size: 15px;
  background: #409eff;
  color: white;
}

.wxImg {
  width: 150px;
  height: 150px;
}
</style>
