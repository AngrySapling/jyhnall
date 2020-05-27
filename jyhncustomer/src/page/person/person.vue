<template>
    <div class="order">
        <Row>
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person title="反馈" :userMsg="userMsg"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18"  class="right">
               <div class="content">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <FormItem label="原密码" prop="oldPwd">
                        <Input type="password" v-model="formCustom.oldPwd"></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newPwd">
                        <Input type="password" v-model="formCustom.newPwd"></Input>
                    </FormItem>
                    <FormItem label="再次输入新密码" prop="passwdCheck">
                        <Input type="password" v-model="formCustom.passwdCheck"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :loading="loading" @click="handleSubmit('formCustom')">提交</Button>
                    </FormItem>
                </Form>
                    
               </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
import order from '@/api/order.js'
import user from '@/api/user.js'
import {removeToken} from '@/utils/storage.js'
export default {
    components:{CardPerson},
    data(){
        const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.formCustom.newPwd) {
                    callback(new Error('两次输入密码不一样'));
                } else {
                    callback();
                }
            };
            return {
                loading:false,
                userMsg:{},
                formCustom: {
                    newPwd: '',
                    passwdCheck: '',
                    oldPwd: ''
                },
                ruleCustom: {
                    newPwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    oldPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
    },
    methods: {
        
        async getPersonMessage(){//个人信息
            let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                console.log(this.userMsg)
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    console.log(this.formCustom)
                    this.loading = true
                    let result = await user.changePassword(this.formCustom)
                    this.loading = false
                    if(result && result.errCode === 1){
                        this.$Message.success('密码修改成功');
                        removeToken()
                        this.$router.push('/login')
                    }
                    
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
    },
    mounted() {
        this.getPersonMessage()
    },
}
</script>
<style lang="less">
  .order{  
    
  }  
</style>