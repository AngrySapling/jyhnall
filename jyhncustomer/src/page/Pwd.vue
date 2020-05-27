<template>
    <div class="pwd">
        <Form :model="formTop" ref="formTop" :rules="ruleValidate" label-position="top" >
            <div class="ivu-card-head"><p>
                重置密码
            </p></div>
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
            <div class="dev-sign-main-aside">
                <Button :loading="isloading1"   @click="handleSubmit('formTop')" type="success" long>
                    <span>确认</span>
                </Button> 
            </div>
        </Form>
    </div>
</template>
<script>
import user from '@/api/user.js'
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
                feedbackPassword:'',
                areaCode: '+86',
                identification:'',
            },
            ruleValidate: {
                phoneNumber: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: validatePhone,trigger: 'blur'}
                ],
                phoneCode: [
                    { required: true, message: '请输入手机验证码', trigger: 'blur' }
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
         handleSubmit(name){//提交重置密码
            this.$refs[name].validate(async(valid) => {
                console.log(valid,'5654564')
                if (valid) {
                    this.isloading1 = true
                    let result = await user.forgetPassword(this.formTop)
                    this.isloading1 = false
                    if(result && result.errCode === 1){
                        this.$Message.success('密码重置成功');
                        this.$router.push('/login')
                    }else{
                        this.$Message.error(result.errMsg);
                    }
                } else {
                    console.log(name,8888)
                }
            })
        },
        // {getPhoneCode,register}
        async getCode(){//获取手机验证码
            console.log('校验')
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
                    this.time = 120
                    this.iptPhoneCode = true
                    let _this = this
                    let isTimes = setTimeout(function(){
                        _this.time--
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
    .pwd{
        display: flex;
        height: 100vh;
        justify-content: center;
        background:#f5f5f5;
        align-items: center;
        box-sizing: border-box;
        padding: 20px 0 50px;
        .ivu-form{
            width: 350px;
            padding:20px 30px;
            border-radius:5px;
            background: #ffffff;
            .ivu-form-item-label{
                text-align: right;
                font-size: 12px;
                color: #515a6e;
                line-height: 0.8;
                padding: 0;
                box-sizing: border-box;
            }
            .ivu-form-item{
                text-align: left;
                margin-bottom:18px;
                display: block !important;
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
            .dev-sign-main-aside{
                margin-top: 35px;
            }
        }
        
            .ivu-card-head {
                border-bottom: none;
                margin: 10px 16px;
                padding: 0;
                font-size: 12px;
            }
        .dev-sign-main-aside-tip{
            margin: 32px 0 16px;
        }
    } 
</style>