<template>
    <div class="person">
        <Row>
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person :title="I18n.person[0]" :userMsg="userMsg"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18"  class="right">
               <div class="content">
                    <Tabs value="name1">
                        <TabPane :label="I18n.person[1]" name="name1">
                            <Form ref="formSeria" :model="formSeria" :rules="ruleSerialNumber" :label-width="100">
                                <FormItem :label="I18n.person[2]" prop="serialNumber">
                                    <Input v-model="formSeria.serialNumber" :disabled="Boolean(userMsg.customerBindStatus)"></Input>
                                </FormItem>
                                <FormItem class="btn" v-if="!userMsg.customerBindStatus">
                                    <Button  type="primary" long :loading="loading1" @click="handleSubmitBind('formSeria')">{{I18n.person[3]}}</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane :label="I18n.person[4]" name="name2">
                            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
                                <FormItem :label="I18n.person[5]" prop="oldPwd">
                                    <Input type="password" v-model="formCustom.oldPwd"></Input>
                                </FormItem>
                                <FormItem :label="I18n.person[6]" prop="newPwd">
                                    <Input type="password" v-model="formCustom.newPwd"></Input>
                                </FormItem>
                                <FormItem :label="I18n.person[7]" prop="passwdCheck">
                                    <Input type="password" v-model="formCustom.passwdCheck"></Input>
                                </FormItem>
                                <FormItem class="btn">
                                    <Button  type="primary" long :loading="loading" @click="handleSubmit('formCustom')">{{I18n.person[3]}}</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                    
               </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
// import order from '@/api/order.js'
import user from '@/api/user.js'
import radom from '@/utils/radom'
import md5 from 'js-md5'
import {removeToken} from '@/utils/storage.js'
export default {
    components:{CardPerson},
    data(){
        const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$i18nMsg().tips.person[0]));
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
                    callback(new Error(this.$i18nMsg().tips.person[1]));
                } else if (value !== this.formCustom.newPwd) {
                    callback(new Error(this.$i18nMsg().tips.person[2]));
                } else {
                    callback();
                }
            };
            const validateSerialNumber = (rule, value, callback) => {
                if (value.length  !== 12) {
                    callback(new Error(this.$i18nMsg().tips.person[3]));
                } else{
                    callback();
                } 
            };
            return {
                formSeria:{
                    serialNumber:'',
                },
                loading1:false,
                loading:false,
                userMsg:{},
                formCustom: {
                    newPwd: '',
                    passwdCheck: '',
                    oldPwd: ''
                },
                ruleSerialNumber: {
                    serialNumber: [
                        { required: true, message: this.$i18nMsg().tips.person[4], trigger: 'blur' },
                        { validator: validateSerialNumber, trigger: 'blur' }
                    ],
                },
                ruleCustom: {
                    newPwd: [
                    { required: true, message: this.$i18nMsg().tips.person[5], trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, message:this.$i18nMsg().tips.person[1], trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    oldPwd: [
                        { required: true, message: this.$i18nMsg().tips.person[0], trigger: 'blur' }
                    ]
                }
            }
    },
    methods: {
        async getPersonMessage(){//个人信息
            let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                this.$store.commit('getUser',result.data)
                console.log(this.userMsg)
                this.formSeria.serialNumber = result.data.serialNumber || result.data.hostNumber
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    let data = JSON.parse(JSON.stringify(this.formCustom))
                    delete data.passwdCheck
                    data.newPwd = md5(md5(data.newPwd+radom))
                    data.oldPwd = md5(md5(data.oldPwd+radom))
                    let result = await user.changePassword(data)
                    this.loading = false
                    if(result && result.errCode === 1){
                        this.$Message.success(this.I18n.tips.person[3]);
                        removeToken()
                        this.$router.push('/login')
                    }
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
        handleSubmitBind (name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    console.log("formSeria",this.formSeria)
                    let data = JSON.parse(JSON.stringify(this.formSeria))
                    this.loading1 = true
                    let result = await user.bindEquipment(data)
                    this.loading1 = false
                    if(result && result.errCode === 1){
                        this.$Message.success('设备绑定成功');
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
  .person{  
      height: 100%;
      .ivu-row{
          height: 100%;
      }
    .content{
        height: 100%;
        width: 80%;
        max-width: 375px;
        margin:0 auto;
        .ivu-form{
            margin-top: 50px;
        }
    }
    .btn{
        .ivu-form-item-content{
            margin: 0 10% !important;
        }
    }
  }  
  
  
</style>