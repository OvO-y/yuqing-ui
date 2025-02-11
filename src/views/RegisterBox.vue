<template>
  <div class="AllContainer">
    <div class="LeftContainer">
      <div class="LeftTop">
        <div class="TopImg">
          <img src="../assets/favicon.png" alt="图标">
          <p>思通数据</p>
        </div>
      </div>
      <div class="BackImg">
        <!--        <img src="../assets/loginLeft.png" alt="登录">-->
        <img src="../assets/img.png" style="width: 85%;height: 85%">
      </div>
    </div>
    <div class="RightContainer">
      <div class="FormBox">
        <form id="RegisterForm" action="">
          <h2>账号注册</h2>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item label="账号名称" prop="name" label-width="100px" label-position="left"
                          style="font-size: 18px">
              <el-input style="height: 35px;" v-model="ruleForm.name" placeholder="请输入账号名称" prefix-icon="User"
                        autocomplete="off"/>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" label-width="100px" label-position="left" class="el-input">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" prefix-icon="Cellphone" clearable/>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="100px"  label-position="left">
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
              <el-input v-model="identifyMode" placeholder="请输入验证码"  clearable/>
              <div class="code" @click="refreshCode">
                <SIdentify :identifyCode="identifyCode"></SIdentify>
              </div>
            </el-form-item>
            <el-form-item style="width: 100%;justify-content: center;">
              <el-button type="primary" class="registerBtn" @click="submitForm(ruleFormRef)">确定</el-button>
              <el-button  style="width: 45%" @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </form>
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
  password: '',
  repassword: ''
})

// 定义一个引用，用于引用表单实例
const ruleFormRef = ref(null)

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

.AllContainer {
  height: 100vh;
  /*width: 1841px;*/
  display: flex;
  flex-direction: row;
  margin: -8px;
}

.LeftContainer {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.LeftTop {
  width: 100%;
  height: 10%;
  background: #01183b;
}

.TopImg {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.TopImg img {
  width: 40px;
  height: 53px;
  margin: 10px 5px;
}

.TopImg p {
  color: white;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
}

.BackImg {
  width: 100%;
  height: 90%;
  /*background: linear-gradient(to bottom, rgb(1, 29, 68), rgb(6, 89, 197));*/
  background: #010230;

  display: flex;
  align-items: center;
  justify-content: center;
}

.BackImg img {
  width: 50%;
  height: 55%;
}

.RightContainer {
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.FormBox {
  width: 55%;
  height: 60%;
  background: #f9f9f9;
  padding: 10px;
  border: none;
  border-radius: 10px;
}

#RegisterForm {
  display: flex;
  align-items: center;
  flex-direction: column;
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
