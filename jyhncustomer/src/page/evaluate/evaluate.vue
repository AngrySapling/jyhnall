<template>
    <div class="evaluate">
        <Row>
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person title="反馈" :userMsg="userMsg" :showback="false"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18" class="right">
               <div class="content">
                    <div class="file">
                        <span>评分 : </span>
                        <div class="content-back">
                            <Rate v-model="score" :disabled="Boolean(evaluate.score)"/>
                        </div>
                    </div>
                    <div class="file">
                        <span>反馈 : </span>
                        <div class="content-back"  v-if="evaluate.id">
                            <ul class="concat">
                                <li v-for="(item,index) in evaluate.comment">
                                    {{item}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="file">
                        <span>回复 : </span>
                        <div class="ipt" >
                            <Input v-model="comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入反馈内容" />
                        </div>
                    </div>
                    <ul class="file">
                        <li class="btn">
                            <Button type="primary" @click="playSaveCustomerScore" :loading="loading">{{evaluate.id?"回复":"提交"}}</Button>
                        </li>
                        <li class="btn">
                            <Button type="primary">取消</Button>
                        </li>
                    </ul>
               </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
import user from '@/api/user.js'
import evaluate from '@/api/evaluate.js'
export default {
    components:{CardPerson},
    data(){
        return {
            userMsg:{},
            score:0,
            comment:"",
            evaluate:{
            },
            loading:false
        }
    },
    methods: {
        async getPersonMessage(){//个人信息
            let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                console.log(this.userMsg)
            }else{

            }
        },
        async getcustomerScoreList(){
            let result = await evaluate.customerScoreList({})
            if(result && result.errCode === 1){
                this.evaluate = result.data.list[0]?result.data.list[0]:{}
                this.evaluate.comment = this.evaluate.comment?this.evaluate.comment.split(","):[]
                this.score = this.evaluate.score;
                console.log(this.evaluate,'456')
            }
        },
        async playSaveCustomerScore(){//提交反馈
            let id = this.evaluate.id
            if(id){
                this.evaluateBack(id)
            }else{
                this.evaluateSave()
            }
        },
        async evaluateBack(id){//回复
            if(!this.comment){
                this.$Message.success({
                    content: "请填写评价内容",
                    duration: 4
                });
                return
            }
            this.loading = true
            let result = await evaluate.additionalEvaluation({comment:this.comment,id:id})
            this.loading = false
            if(result && result.errCode === 1){
                this.$Message.success({
                    content: "提交成功",
                    duration: 4
                });
                this.comment = "";
                this.getcustomerScoreList()
            }
        },
        async evaluateSave(){//提交
            let data = {
                score:this.score,
                comment:this.comment
            }
            console.log(this.evaluate)
            if(!this.comment){
                this.$Message.success({
                    content: "请填写评价内容",
                    duration: 4
                });
                return
            }else if(!this.score){
                this.$Message.error({
                    content: "请选择评分",
                    duration: 4
                });
                return
            }
            this.loading = true
            let result = await evaluate.saveCustomerScore(data)
            this.loading = false
            if(result && result.errCode === 1){
                this.$Message.success({
                    content: "提交成功",
                    duration: 4
                });
                this.getcustomerScoreList()
            }
        }
    },
    mounted() {
        this.getPersonMessage()
        this.getcustomerScoreList()
    },
}
</script>
<style lang="less">
    .evaluate{
        height: 100%;
        .content{
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            .ivu-col{
                text-align: left;
            }
            .ivu-row{
                padding: 10px 0;
            }
            .file{
                display: flex;
                padding: 10px 0;
                line-height: 32px;
                text-align: left;
                .btn{
                    list-style: none;
                    flex: 1;
                    text-align:center;
                }
                .content-back{
                    flex: 1;
                    padding-left: 10px;
                    .concat{
                        padding: 0 20px;
                        border:1px solid #f5f5f5;
                    }
                    
                }
            }
            .ipt{
                padding: 10px;
                flex: 1;
            }
        }
    
    } 
</style>