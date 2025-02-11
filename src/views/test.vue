<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="账号名称" prop="name" label-width="100px" label-position="left" style="font-size: 18px">
      <el-input style="height: 35px;" v-model="ruleForm.name" placeholder="请输入账号名称" prefix-icon="User"
                autocomplete="off" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone"  label-width="100px" label-position="left" class="el-input">
      <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" clearable/>
    </el-form-item>
    <el-form-item label="密码" prop="password"   label-width="100px" label-position="left">
      <el-input v-model="ruleForm.password"
                style="width: 100%"
                type="password"
                placeholder="请输入密码"
                show-password
      />
    </el-form-item>
    <el-form-item label="确认密码"   prop="repassword"  label-width="100px" label-position="left">
      <el-input v-model="ruleForm.repassword"
                style="width: 100%"
                type="password"
                placeholder="请输入密码"
                show-password
      />
    </el-form-item>
    <el-form-item label="验证码" label-width="100px" label-position="left">
      <el-input v-model="identifyMode" placeholder="请输入验证码" clearable/>
      <div class="code" @click="refreshCode">
        <SIdentify :identifyCode="identifyCode"></SIdentify>
      </div>
    </el-form-item>
    <el-form-item style="width: 70%;margin: 0 10px">
      <el-button type="primary" class="registerBtn" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

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
// 存储表单数据的响应式对象
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
  name: '',
  phone: '',
  password: '',
  repassword: ''
})

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
</script>
