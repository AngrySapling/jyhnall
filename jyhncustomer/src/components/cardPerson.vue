<template>
    <div>
        <Card :bordered="false">
            <p slot="title">{{I18n.carts[0]}}</p>
            <p class="msg"><span class="msg-title">{{I18n.carts[1]}}:</span><span class="msg-content">{{userMsg.feedbackName}}</span></p>
            <p class="msg"><span class="msg-title">{{I18n.carts[2]}}:</span><span class="msg-content">{{userMsg.phoneNumber}}</span></p>
            <p class="msg"><span class="msg-title">{{I18n.carts[3]}}:</span><span class="msg-content">{{userMsg.feedbackEmail}}</span></p>
            <p class="msg"><span class="msg-title">{{I18n.carts[4]}}:</span ><span class="msg-content">{{userMsg.hostNumber || userMsg.serialNumber}}</span></p>
        </Card>
    <Card :bordered="false" style="margin-top:10px;" v-if="showback">
            <p slot="title">{{title}}</p>
            <p class="msg"><Button type="primary" long  @click="newBuilt()">{{I18n.carts[5]}}</Button></p>
            <div class="myquest">
                <h4>{{I18n.carts[6]}}:</h4>
                <ul >
                    <li @click="toDetail(item.backUuid)" class="item" v-for="(item,index) in backList" :key="index">{{item.type}}</li>
                </ul>
            </div>
            
        </Card>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:""
        },
        userMsg:{
            type:Object,
            default:function(){
                return {}
            }
        },
        showback:{
            type:Boolean,
            default:false
        },
        backList:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data(){
        return {

        }
    },
    methods: {
        toDetail(item){
            this.$emit('toDetail',item)
        },
        newBuilt(){
            this.$emit('newBuilt')
        }
    },
}
</script>
<style lang="less">
    .ivu-card{
        text-align: left;
        .msg{
           display: flex;
           line-height:25px;
            .msg-title{
                text-align: left;
                width: 80px;
                text-align-last: justify;
            }
            .msg-content{
                flex: 1;
                padding-left: 10px;
            }
            
        }
        .myquest{
            border-top: 1px solid #f5f5f5;
            padding: 5px 0;
            margin-top: 10px;
            ul{
                padding-left:1em ;
                li{
                    list-style: none;
                }
            }
        }
        .item{
            padding: 5px;
            line-height: 25px;
            border-bottom: 1px solid #f5f5f5;
        }
    }
</style>