<template>
    <div class="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >
            <FormItem prop="phoneNumber">
                <Input type="text" v-model="formInline.phoneNumber" :placeholder="I18n.login[0]">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="feedbackPassword">
                <Input type="password" v-model="formInline.feedbackPassword" :placeholder="I18n.login[1]">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="success" :loading="loading" long @click="handleSubmit('formInline')">{{I18n.login[2]}}</Button>
            </FormItem>
            <div class="dev-sign-main-aside-tip">
                <p><router-link to="/pwd">{{I18n.login[3]}}?</router-link></p> 
                <p>{{I18n.login[4]}}?<router-link to="/reg">{{I18n.login[5]}}</router-link></p>
            </div>
        </Form>
    </div>
</template>
<script>
import feedback from '@/api/user.js'
import {setToken} from '@/utils/storage.js'
import radom from '@/utils/radom'
import md5 from 'js-md5'
export default {
    data(){
        return {
            loading:false,
            formInline: {
                phoneNumber: '',
                feedbackPassword: ''
            },
            ruleInline: {
                phoneNumber: [
                    { required: true, message:this.$i18nMsg().tips.login[0], trigger: 'blur' }
                ],
                feedbackPassword: [
                    { required: true, message:this.$i18nMsg().tips.login[1], trigger: 'blur' },
                    { type: 'string', min: 6, message:this.$i18nMsg().tips.login[2], trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        console.log(this.I18n)
        this.ruleInline.phoneNumber
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    let data = JSON.parse(JSON.stringify(this.formInline))
                    this.loading = true
                    data.feedbackPassword = md5(md5(data.feedbackPassword+radom))
                    let result = await feedback.feedbackLogin(data)
                    this.loading = false
                    if(result && result.data){
                        this.$Message.success(this.I18n.tips.login[3]);
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