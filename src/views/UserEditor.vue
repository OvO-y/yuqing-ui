<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--        <menu-element></menu-element>-->
        <editor-navigation></editor-navigation>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-container">

            <navigation-element :activeIndex="activeIndex">
              <template #toggle-button>
                <div class="toggle-button" @click="toggleCollapse">
                  <el-icon v-if="!isCollapse">
                    <Fold/>
                  </el-icon>
                  <el-icon v-else>
                    <Expand/>
                  </el-icon>
                </div>
              </template>
            </navigation-element>
            <el-icon class="right-icon" @click="jumpSetting">
              <Setting/>
            </el-icon>
          </div>
        </el-header>
        <el-main>
          <div class="mainContent">
            <p class="naviSet">系统设置&nbsp;>&nbsp;账号管理</p>
            <div class="account">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="account" label="用户名"/>
                <!--                <el-table-column prop="companyName" label="公司名称" width="180"/>-->
                <el-table-column prop="email" label="邮箱地址" width="200"/>
                <el-table-column prop="userStatus" label="用户状态"/>
                <!--                <el-table-column prop="loginTime" label="登录次数"/>-->
                <el-table-column prop="recentLogin" label="最近一次登录" width="200"/>
                <el-table-column prop="operation" label="操作">
                  <template #default="scope">
                    <!--                    <el-button type="text" @click="handleEdit(scope.row)">-->
                    <el-button type="text" @click="dialogFormVisible = true">
                      <el-icon>
                        <Edit/>
                      </el-icon>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog v-model="dialogFormVisible" title="个人信息编辑" width="500">
                <el-form :model="form" :rules="ruleForm" ref="formRef">
                  <el-form-item label="原密码：" prop="oldPassword" :label-width="formLabelWidth">
                    <el-input v-model="form.oldPassword" autocomplete="off"/>
                  </el-form-item>
                  <el-form-item label="新密码：" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomple te="off"/>
                  </el-form-item>
                  <el-form-item label="再次确认密码：" prop="passwordConfirm" :label-width="formLabelWidth">
                    <el-input v-model="form.passwordConfirm" autocomplete="off"/>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="resetForm">取消</el-button>
                    <el-button type="primary" @click="submitForm()">
                      确认
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </div>
          </div>
          <!--          <router-view></router-view>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {computed, onMounted, provide, reactive, ref, userStore} from 'vue'
// import MenuElement from '@/views/components/MenuElement.vue'
import NavigationElement from '@/views/components/NavigationElement.vue'
import EditorNavigation from '@/views/components/EditorNavigation.vue'
import request, {postRequestForUser} from "@/request";
import {ElMessage} from 'element-plus'
import store from "@/store";

const isCollapse = ref(false) // 侧边栏折叠状态
provide('isCollapse', isCollapse)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const tableData = ref([]); // 初始化为空数组
const account = computed(() => store.state.user?.account || '未登录')
// const user = ref({});
onMounted(() => {
  console.log('获取用户数据')
  console.log(account)
  if (!store.state.user.account) { // 如果用户未登录，重定向至登录页
    router.push('/login'); // 假设登录路由名为 '/login'
  }
  fetchUserInfo()
})
// const store = userStore();
//读取账号
// const account =store.account;
const fetchUserInfo = async () => {
  const currentAccount = account.value
  try {
    const response = await postRequestForUser('/showAccount', {
      account:currentAccount
    })
    console.log('响应内容：', response)
    if (response && response.code === '0') {
      console.log(tableData)
      // tableData.splice(0, tableData.length,
      //   ...response.data
      // )
      //   tableData.value = response.data;
      tableData.value = Array.isArray(response.data) ? response.data : [response.data];
    }
  } catch (error) {
    console.error('Failed to fetch user information:', error)
  }
}

//编辑
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  account: '',
  password: '',
  oldPassword: '',
  passwordConfirm: ''
})
//校验密码规则
const validatePasswordComplexity = (rule, value, callback) => {
  // 密码必须包含至少6个字符，一个大写字母、一个小写字母和一个数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(value)) {
    return callback(new Error('密码必须至少6个字符，包含数字、大小写字母'))
  } else {
    callback();
  }
};
//校验两次密码输入是否一致
const validatePass = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  password: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur'
    },
    {
      validator: validatePasswordComplexity, // 添加自定义的密码复杂度验证
      trigger: 'blur'
    },
  ],
  oldPassword: [
    {
      required: true,
      message: '请输入原密码',
      trigger: 'blur'
    },
    {
      validator: validatePasswordComplexity, // 添加自定义的密码复杂度验证
      trigger: 'blur'
    }],
  passwordConfirm: [
    {
      required: true,
      message: '请再次确认密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 16,
      message: '长度在 6 到 16 个字符',
      trigger: 'blur'
    },
    {
      validator: validatePass,
      trigger: 'blur'
    }
  ]
})

const formRef = ref(null)
//用于重置表单
const resetForm = () => {
  dialogFormVisible.value = false;
  if (formRef.value) {
    formRef.value.resetFields(); // 清除表单数据和验证结果
  }
};
//修改密码
const submitForm = async () => {
  console.log(form)
  console.log("开始修改密码")
  try {

    const response = await postRequestForUser('/changePassword', {
        // form
        account: store.state.user.account,
        password: form.password,
        oldPassword: form.oldPassword
      }
    )
    console.log(response)
    //返回信息提示
    if (response && response.code === '0') {
      ElMessage({
        message: '成功修改密码',
        type: 'success',
      });
      resetForm();
    }
    if (response && response.code === '-1' && response.message === "原密码错误，请重新输入") {
      ElMessage({
        message: '原密码错误，请重新输入',
        type: 'warning',
      });
      resetForm();
    }
  } catch (error) {
    ElMessage.error("请求失败")
    console.error('Failed to fetch user information:', error)
    resetForm();
  }

}


</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-container {
  height: 100%;
}

.el-aside {
  background: rgb(65, 71, 85);
  height: 100%;
  transition: width 0.3s ease; /* 动画效果 */
}

.toggle-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
  position: relative;
  top: 21px;
  left: -5px;
  height: 0;
  width: 30px;
  z-index: 999;
  padding-left: 5px;
}

.toggle-button .el-icon {
  //padding: 10px 11px 10px 10px;
  padding: 28px 10px 10px 20px
}

.el-header {
  padding: 0 !important;
  margin: 0 !important;
}

.header-container {
  position: relative;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
}

.right-icon {
  position: absolute;
  top: 22px;
  right: 20px;
  cursor: pointer;
}

.el-main {
  padding: 0;
  height: 100%;
}

.mainContent {
  background-color: rgb(238, 245, 249);
  height: 100%;
}

.naviSet {
  font-size: 12px;
  float: left;
  margin: 15px;
}

.account {
  margin: 0 20px;
}
</style>
