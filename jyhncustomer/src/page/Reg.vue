<template>
    <div class="reg">
        <Form :model="formTop" ref="formTop" :rules="ruleValidate" label-position="top" inline>
            <FormItem label="手机号" prop="phoneNumber" >
                <Input v-model="formTop.phoneNumber"></Input>
            </FormItem>
            <FormItem label="验证码" prop="phoneCode">
                <div  class="code" >
                    <Input v-model="formTop.phoneCode" :disabled="!iptPhoneCode"></Input>
                    <Button  type="success" @click="getCode" :loading="isloading0">{{time?time:'获取验证码'}}</Button>
                </div>
            </FormItem>
            <FormItem label="密码" prop="feedbackPassword">
                <Input type="password" v-model="formTop.feedbackPassword"></Input>
            </FormItem>
            <FormItem label="重新输入密码" prop="feedbackPasswordCheck">
                <Input type="password" v-model="formTop.feedbackPasswordCheck"></Input>
            </FormItem>
            <FormItem label="姓名" prop="feedbackName">
                <Input v-model="formTop.feedbackName"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="name">
                <Input v-model="formTop.input3"></Input>
            </FormItem>
            <FormItem label="机器序列号" prop="serialNumber">
                <Input v-model="formTop.serialNumber"></Input>
            </FormItem>
            <div class="dev-sign-main-aside">
                <button :loading="isloading1" type="button"  @click="handleSubmit('formTop')" class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large">
                <span>注册</span>
                </button> 
                <div class="dev-sign-main-aside-tip">
                    <!-- <p>注册即表示您同意我们的<a href="/privacy" target="_blank">服务条款与隐私政策</a></p>  -->
                    <p>已经拥有账户？ <router-link to="/login">登录</router-link></p>
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
                callback(new Error('请输入正确手机号'));
            }else{
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入你的密码'));
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
                callback(new Error('请重新输入你的密码'));
            } else if (value !== this.formTop.feedbackPassword) {
                callback(new Error('两次密码不一样'));
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
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: validatePhone,trigger: 'blur'}
                ],
                mail: [
                    // { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                phoneCode: [
                    { required: true, message: '请输入手机验证码', trigger: 'blur' }
                ],
                feedbackName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                serialNumber: [
                    // { required: true, message: '请输入设备序列号', trigger: 'blur' },
                    { type: 'string',len: 12, message: '请输入11位设备序列号', trigger: 'change' }
                ],
                feedbackPassword: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                feedbackPasswordCheck: [
                    { required: true, message: '请重新输入密码', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
         handleSubmit(name){//提交注册信息
            console.log( this.$refs[name],'5654564')
            this.$refs[name].validate(async(valid) => {
                console.log(valid,'5654564')
                if (valid) {
                    delete this.formTop.feedbackPasswordCheck
                    this.isloading1 = true
                    let data = JSON.parse(JSON.stringify(this.formTop))
                    data.feedbackPassword = md5(md5(data.feedbackPassword+radom))
                    let result = await user.register(data)
                    this.isloading1 = false
                    if(result && result.errCode === 1){

                        this.$Message.success('注册成功');
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
                    this.$Message.success('验证码获取成功');
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