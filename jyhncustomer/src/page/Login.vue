<template>
    <div class="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >
            <FormItem prop="feedbackName">
                <Input type="text" v-model="formInline.feedbackName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="feedbackPassword">
                <Input type="password" v-model="formInline.feedbackPassword" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="success" long @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
            <div class="dev-sign-main-aside-tip">
                <p><router-link to="/pwd">忘记密码？</router-link></p> 
                <p>尚未拥有账户？<router-link to="/reg">注册</router-link></p>
            </div>
        </Form>
    </div>
</template>
<script>
import feedback from '@/api/user.js'
import {setToken} from '@/utils/storage.js'
export default {
    data(){
        return {
            formInline: {
                feedbackName: '',
                feedbackPassword: ''
            },
            ruleInline: {
                feedbackName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                feedbackPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码至少8位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    console.log(this.formInline)
                    let result = await feedback.feedbackLogin(this.formInline)
                    console.log(result)
                    if(result && result.data){
                        this.$Message.success('登录成功');
                        let data = result.data
                        setToken(data.token)
                        this.$router.push("/feedback")
                    }
                } else {
                    
                }
            })
        }
    },
}
</script>
<style lang="less">
  .login{
      height: 100vh;
      display: flex;
      justify-content: center;
        background:#f5f5f5;
      align-items: center;
      .ivu-form{
          width: 350px;
          padding:20px 30px;
          border-radius:5px;
          background: #ffffff;
          .ivu-form-item{
              display: block !important;
          }
      }
  }  
</style>