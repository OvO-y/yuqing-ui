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
          <img src="../assets/彩色云端.jpg" style="width: 100%;height: 100%" alt="彩色云端">
          <img src="../assets/线条.png" style="position: absolute;
    width: 300px;
    height: 550px;
    left: 9px;
    bottom: 49px;
    opacity: 0.4;
}" alt="线条">
          <img src="../assets/蓝色人.png" style="position: absolute;
    width: 250px;
    height: 300px;
    right: 9px;
    bottom: 15px;" alt="蓝色人">

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
              </ul>
            </div>
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
              <div style="display: flex;margin: 20px;">
                <div>还没账号？去<span style="color: #42b983;cursor: pointer"><button @click="toRegisterPage" style="color: rgb(66, 185, 131);
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font-size: 15px;">注册</button></span></div>
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
import { phoneloginApi, accountloginApi } from '@/api/lore'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
// const route = useRoute()
const store = useStore() // 新增store实例
// 定义一个引用，用于引用表单实例
const ruleFormRef = ref(null)

// 验证手机号的函数
const validatePhone = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入手机号或邮箱'))
  }
  // 使用正则表达式检查是否为纯数字且长度为 11 位（中国大陆手机号长度）
  const phoneRegex = /^[0-9]{11}$/
  // 验证邮箱的正则表达式
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/

  if (phoneRegex.test(value) || emailRegex.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的手机号或邮箱'))
  }
}
// 验证密码的函数
const validatePassword = function (rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  // 使用正则表达式检查是否包含大小写字母和数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('密码必须包含至少一个大写字母、一个小写字母和一个数字'))
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

// 去注册页面的函数
function toRegisterPage () {
  // router.push({
  //   path: '/register',
  //   query: {
  //     title: '666'
  //   }
  // })
  router.push({
    name: 'Register',
    query: {
      title: 'test'
    }
  })
}

// 提交表单的函数
const Login = async function (formEl) {
  if (!formEl) return
  try {
    const valid = await formEl.validate()
    if (valid) {
      // 公共响应处理函数
      const handleLoginResponse = (res) => {
        alert(res.resp)
        console.log(`${loginMethod.value} 后端返回内容:`, res.resp)
        if (res.resp.includes('successfully')) {
          localStorage.setItem('token', res.token)
          store.dispatch('asyncUpdateUser', {
            account: res.account,
            telephone: res.telephone
          })
          router.push({
            name: 'test',
            query: { title: 'test' }
          })
        }
      }

      // 根据登录方式执行验证和请求
      if (loginMethod.value === 'phone') {
        // await new Promise((resolve, reject) => {
        //   validateCode(null, validword.value, (error) => error ? reject(error) : resolve())
        // })
        console.log('手机验证码验证')
      }

      // API配置映射表：通过登录方式动态选择接口和参数
      const apiMap = {
        // 键：登录方式 | 值：[API函数, 请求参数]
        phone: [phoneloginApi, { telephone: ruleForm.phone }],
        account: [accountloginApi, {
          password: ruleForm.password,
          account: ruleForm.phone
        }]
      }
      // 动态解构API和参数，根据当前的登录方式 (loginMethod.value) 从 apiMap 中动态获取相应的 API 函数和请求参数
      const [api, params] = apiMap[loginMethod.value] || []
      if (!api) {
        console.log('error submit!')
        return
      }

      const response = await api(params)
      handleLoginResponse(response)
      console.log('登录成功')
    } else {
      console.log('表单验证失败')
    }
  } catch (error) {
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
