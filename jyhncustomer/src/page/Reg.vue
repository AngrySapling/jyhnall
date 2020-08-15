<template>
    <div class="reg">
        <Form :model="formTop" ref="formTop" :rules="ruleValidate" label-position="top" inline>
            <FormItem :label="I18n.register[0]" prop="phoneNumber" >
                <Input v-model="formTop.phoneNumber"></Input>
            </FormItem>
            <FormItem :label="I18n.register[1]" prop="phoneCode">
                <div  class="code" >
                    <Input v-model="formTop.phoneCode" :disabled="!iptPhoneCode"></Input>
                    <Button  type="success" @click="getCode" :loading="isloading0">{{time?time:I18n.register[2]}}</Button>
                </div>
            </FormItem>
            <FormItem :label="I18n.register[3]" prop="feedbackPassword">
                <Input type="password" v-model="formTop.feedbackPassword"></Input>
            </FormItem>
            <FormItem :label="I18n.register[4]" prop="feedbackPasswordCheck">
                <Input type="password" v-model="formTop.feedbackPasswordCheck"></Input>
            </FormItem>
            <FormItem :label="I18n.register[5]" prop="feedbackName">
                <Input v-model="formTop.feedbackName"></Input>
            </FormItem>
            <FormItem :label="I18n.register[6]" prop="name">
                <Input v-model="formTop.input3"></Input>
            </FormItem>
            <FormItem :label="I18n.register[7]" prop="serialNumber">
                <Input v-model="formTop.serialNumber"></Input>
            </FormItem>
            <div class="dev-sign-main-aside">
                <button :loading="isloading1" type="button"  @click="handleSubmit('formTop')" class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large">
                <span>{{I18n.register[8]}}</span>
                </button> 
                <div class="dev-sign-main-aside-tip">
                    <!-- <p>注册即表示您同意我们的<a href="/privacy" target="_blank">服务条款与隐私政策</a></p>  -->
                    <p>{{I18n.register[9]}}? <router-link to="/login">{{I18n.register[10]}}</router-link></p>
                </div>
            </div>
        </Form>
    </div>
</template>
<script>
import user from '@/api/user.js'
import radom from '@/utils/radom'
import md5 from 'js-md5'
export default {
    data(){
        const validatePhone = (rule, value, callback) => {
            if (value === '' || !(/^1[3456789]\d{9}$/.test(value))) {
                callback(new Error(this.$i18nMsg().tips.login[4]));
            }else{
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$i18nMsg().tips.login[5]));
            } else {
                
                if (this.formTop.feedbackPasswordCheck !== '') {
                    // 对第二个密码框单独验证
                    callback();
                    this.$refs.formTop.validateField('feedbackPasswordCheck');
                }
                callback();
            }
            callback();
        };

        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$i18nMsg().tips.login[6]));
            } else if (value !== this.formTop.feedbackPassword) {
                callback(new Error(this.$i18nMsg().tips.login[7]));
            } else {
                callback();
            }
            callback();
        };
        return {
            iptPhoneCode:false,
            time:0,
            isloading1:false,
            isloading0:false,
            formTop: {
                phoneNumber: '',
                phoneCode:'',
                mail: '',
                feedbackName: '',
                serialNumber: '',
                feedbackPassword:'',
                feedbackPasswordCheck:'',
                areaCode: '+86',
                identification:'',
            },
            ruleValidate: {
                phoneNumber: [
                    { required: true, message: this.$i18nMsg().tips.login[8], trigger: 'blur' },
                    {validator: validatePhone,trigger: 'blur'}
                ],
                mail: [
                    // { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: this.$i18nMsg().tips.login[14], trigger: 'blur' }
                ],
                phoneCode: [
                    { required: true, message: this.$i18nMsg().tips.login[13], trigger: 'blur' }
                ],
                feedbackName: [
                    { required: true, message: this.$i18nMsg().tips.login[12], trigger: 'blur' }
                ],
                serialNumber: [
                    // { required: true, message: '请输入设备序列号', trigger: 'blur' },
                    { type: 'string',len: 12, message:this.$i18nMsg().tips.login[16] , trigger: 'change' }
                ],
                feedbackPassword: [
                { required: true, message: this.$i18nMsg().tips.login[1], trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                feedbackPasswordCheck: [
                    { required: true, message: this.$i18nMsg().tips.login[6], trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
         handleSubmit(name){//提交注册信息
            this.$refs[name].validate(async(valid) => {
                if (valid) {
                    delete this.formTop.feedbackPasswordCheck
                    this.isloading1 = true
                    let data = JSON.parse(JSON.stringify(this.formTop))
                    data.feedbackPassword = md5(md5(data.feedbackPassword+radom))
                    let result = await user.register(data)
                    this.isloading1 = false
                    if(result && result.errCode === 1){

                        this.$Message.success(this.$i18nMsg().tips.login[15]);
                        this.$router.push('/login')
                    }
                } else {
                    console.log(name,8888)
                }
            })
        },
        // {getPhoneCode,register}
        async getCode(){//获取手机验证码
            if(this.formTop['phoneNumber'] && !this.time){
                let identification = this.formTop.identification = new Date().getTime()
                let data = {
                    identification,
                    areaCode:'+86',
                    phoneNumber:this.formTop['phoneNumber']
                }
                this.isloading0 = true
                let result = await user.getPhoneCode(data)
                this.isloading0 = false
                if(result && result.data){
                    this.$Message.success(this.$i18nMsg().tips.login[11]);
                    this.iptPhoneCode = true
                    let _this = this
                    this.time = 120
                    let isTimes = setInterval(function(){
                        _this.time--
                        console.log(_this.time,'time')
                        if(!_this.time){
                            clearTimeout(isTimes)
                            _this.iptPhoneCode = false
                        }
                    },1000)
                }else{
                    this.$Message.error(result.errMsg);
                }
            }
            
            
        }
    },
}

</script>
<style lang="less">
    .reg{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        background:#f5f5f5;
        box-sizing: border-box;
        padding: 20px 0 50px;
        .ivu-form{
            width: 350px;
            padding:20px 30px;
            border-radius:5px;
            background: #ffffff;
            .ivu-form-item{
                display: block !important;
                text-align: left;
                margin-bottom:18px;
                margin-right: 0;
            }
            .ivu-form-item-label{
                text-align: right;
                font-size: 12px;
                color: #515a6e;
                line-height: 0.8;
                padding: 0;
                box-sizing: border-box;
            }
            .ivu-input{
                height:30px ;
            }
            .code{
                display: flex;
                .ivu-input-wrapper{
                    flex: 1;
                    .ivu-input{
                        max-width: 100px;
                    }
                }
                .ivu-btn-primary{
                    float:right;
                }
            }
        }
        
        .dev-sign-main-aside-tip{
            margin: 32px 0 16px;
        }
    } 
</style>