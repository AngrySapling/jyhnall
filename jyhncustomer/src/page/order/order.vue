<template>
    <div class="order">
        <Row>
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person :userMsg="userMsg"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18" class="right">
               <div class="content">
                   <ul>
                       <li v-for="(item,index) in orderList" :key="index">
                        <Row class="order-top">
                            <Col  :xs="24" :sm="12">
                                <p class="li">
                                    <span class="sp-title">{{I18n.order[0]}}:</span>
                                    <span class="sp-content">{{item.customerCreateTime}}</span>
                                </p>
                            </Col>
                            <Col  :xs="24" :sm="12">
                                <p class="li">
                                    <span class="sp-title">{{I18n.order[1]}}:</span>
                                    <span class="sp-content">No.{{item.orderNo}}</span>
                                </p>
                            </Col>
                            <Col  :xs="24" :sm="12">
                                <p class="li">
                                    <span class="sp-title">{{I18n.order[2]}}:</span>
                                    <span class="sp-content">{{item.orderStatus === 0?'预约':item.orderStatus === 1?'运输中':'已签收'}}</span>
                                </p>
                            </Col>
                            <Col  :xs="24" :sm="12">
                                <p class="li">
                                    <span class="sp-title">{{I18n.order[3]}}:</span>
                                    <span class="sp-content">{{item.ExpressType}}</span>
                                </p>
                            </Col>
                            <Col  :xs="24" :sm="12">
                                <p class="li">
                                    <span class="sp-title">{{I18n.order[4]}}:</span>
                                    <span class="sp-content">{{item.ExpressCode}}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row class="order-content">
                            <Col :xs="24" :sm="12" >
                                <div class="content-left">
                                    <p class="li">
                                        <span class="sp-title">{{I18n.order[5]}}: </span>
                                        <span class="sp-content">{{item.name}}</span>
                                    </p>
                                    <p class="li">
                                        <span class="sp-title">{{I18n.order[6]}}: </span>
                                        <span class="sp-content">{{item.phoneNumber}}</span>
                                    </p>
                                    <p class="li">
                                        <span class="sp-title">{{I18n.order[7]}}: </span>
                                        <span class="sp-content">{{item.region+','+item.detailedAddress}}</span>
                                    </p>
                                    <p class="li">
                                        <span class="sp-title">{{I18n.order[8]}}: </span>
                                        <span class="sp-content">{{item.postalCode}}</span>
                                    </p>
                                </div>
                            </Col>
                            <Col :xs="24" :sm="12">
                                <div class="content-right">
                                    <li class="title">
                                        <p>{{I18n.order[9]}}</p>
                                        <p>{{item.productModel}}</p> 
                                    </li>
                                    <li class="title">
                                        <p >{{I18n.order[10]}}</p>
                                        <p>{{item.buyNumber}}</p>
                                    </li>
                                </div>
                            </Col>
                        </Row>
                       </li>
                    
                   </ul>
                    
               </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
import order from '@/api/order.js'
import user from '@/api/user.js'
import { formatTime } from '@/utils/playDate.js'
export default {
    components:{CardPerson},
    data(){
        return {
            //订单列表
            orderList:[],
            userMsg:{}
        }
    },
    methods: {
        async getPersonMessage(){//个人信息
            let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                console.log(this.userMsg)
                this.getOrderList(result.data.phoneNumber)
            }else{
                this.$Message.error({
                    content: result.errMsg,
                    duration: 4
                });
            }
        },
        async getOrderList(id){
            let result = await order.customerOrderStatus({})
            if(result && result.errCode === 1){
                result.data.map(res=>{
                    res.customerCreateTime = formatTime(res.customerCreateTime,'Y-M-D h:m')
                })
                this.orderList = result.data
            }
        }
    },
    mounted() {
        this.getPersonMessage()
    },
}
</script>
<style lang="less">
    .order{
        li{
            list-style: none;
            margin-bottom:10px;
            .order-content{
                border-right: 1px solid #aaaaaa;
                border-bottom: 1px solid #aaaaaa;
                border-left: 1px solid #aaaaaa;
            }
            .order-top{
                border-right: 1px solid #aaaaaa;
                border-top: 1px solid #aaaaaa;
                border-left: 1px solid #aaaaaa;
                padding: 10px;
            }
        }
        .content{
            padding: 10px;
            box-sizing: border-box;
            background: #fff;
            .ivu-col{
                text-align: left;
            }
        }
        .content-left{
            padding: 0.4rem;
            box-sizing: border-box;
            border-top: 1px solid #aaaaaa;
            border-right: 1px solid #aaaaaa;
        }
    .content-left .li{
        display: flex;
        margin: 0.4rem 0;
    }
    .content-left .li .sp-title{
        min-width: 60px;
        text-align-last:justify;
    }
    .content-left .li .sp-content{
        flex: 1;
        padding-left: 10px;
    }
.left-content{
    border-right: 1px solid #aaa;
    border-top: 1px solid #aaa;
}
.content-right{
    display: flex;
    text-align: center;
    padding: 0;
    border-top: 1px solid #aaa;
}
.content-right .title{
    flex: 1;
}
.content-right .title{
    border-right: 1px solid #aaaaaa;
}
.content-right p{
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #aaaaaa;
}
.content-right .title:last-child{
    border: none;
}    
    
  }  
</style>