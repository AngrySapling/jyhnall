<template>
    <div class="feedback">
        <Row class="back-row">
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person @toDetail="getFeedBackDetail" @newBuilt="newBuilt" title="反馈" :userMsg="userMsg" :showback="true" :backList="backList"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18" class="right">
               <div class="content">
                    <Row>
                        <Col :xs="24" :sm="12" :md="8" :lg="8">
                            <span>类别 : </span>
                            <Dropdown trigger="click" style="margin-left: 20px"  @on-click="change">
                                <a href="javascript:void(0)">
                                    {{feedBackDetail.type?feedBackDetail.type:checkItem.type}}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list" v-if="!backUuid">
                                    <DropdownItem :name="item.id" v-for="(item,index) in dropList" :key="item.id">{{item.type}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col :xs="24" :sm="12" :md="8" :lg="8" v-if="backUuid">
                            <span>日期 : </span>
                            <span>{{feedBackDetail.createTime}}</span>
                        </Col>
                        <Col  :xs="24" :sm="12" :md="8" :lg="8" v-if="backUuid">
                            <span>状态 : </span>
                            <span>{{feedBackDetail.backStatus?'已解决':'待解决'}}</span>
                        </Col>
                    </Row>
                    <div class="file">
                        <div>附件 : </div>
                        <div class="upload-photo">
                            <div style="text-align:left;padding-bottom:10px;">图片</div>
                            <div style="overflow: hidden;">
                                <div class="demo-upload-list" v-for="(item,index) in uploadList">
                                    <template>
                                        <img :src="item.url">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                        </div>
                                    </template>
                                </div>
                                <Upload
                                    v-if="!feedBackDetail.backUuid"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="1024"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    name="photo"
                                    action="http://192.168.199.228:8989/wechat/uploadPhotoFile"
                                    style="display: inline-block;width:58px;border:1px solid #f5f5f5;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="ios-camera" size="20"></Icon>
                                    </div>
                                </Upload>
                            </div>
                            <div style="text-align:left;padding: 10px 0;">视频</div>
                            <Upload
                                v-if="!backUuid"
                                name="video"
                                :on-success="handleVideoSuccess"
                                :before-upload="handleBeforeUploadVideo"
                                :on-format-error="handleFormatVideoError"
                                :format="['avi','mp4','rmvb','MOV']"
                                action="http://192.168.199.228:8989/wechat/uploadVideoFile">
                                <Button icon="ios-cloud-upload-outline">选择视频文件上传</Button>
                            </Upload>
                            <div v-if="file !== null">{{ file.name }}</div>
                            <div v-if="backUuid" class="video">
                                <video :src="feedBackDetail.videoUrl" controls="controls"></video>
                            </div>
                        </div>
                        
                    </div>
                    <div class="file" v-if="feedBackDetail.backUuid">
                        <span>反馈 : </span>
                        <div class="content-back">
                            <ul class="message-concat">
                                <li :key="index" v-for="(item,index) in feedBackDetailChat" :style="{listStyle:'none',textAlign:item.backName === '客服'?'right':'left'}" :class="[item.backName === '客服'?'right':'left']">
                                    <h4 v-if="item.backName === '客服'">
                                        <span :style="{color:'#ccc',fontWeight:200,fontSize:'14px'}">{{item.backTime}} : </span>
                                        <span>{{item.backName}}</span>
                                    </h4>
                                    <h4  v-if="item.backName !== '客服'">
                                        <span>{{item.backName}}</span>
                                        <span style="color:'#ccc';font-weight:200;font-size:'14px'">{{item.backTime}} : </span>
                                    </h4>
                                    <div class="backmsg"> <p >{{item.backContent}}</p> </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="file" v-if="!feedBackDetail.backStatus">
                        <span>回复 : </span>
                        <div class="ipt">
                            <Input v-model="textVal" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入反馈内容" />
                        </div>
                    </div>
                    
                    <ul class="file">
                        <li class="btn">
                            <Button type="primary" :loading="loading" :disabled="Boolean(feedBackDetail.backStatus)" @click="playCustomerBack">
                                <span v-if="!loading">{{feedBackDetail.backUuid?'回复':'提交'}}</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </li>
                        <li class="btn">
                            <Button type="primary" :loading="loading1" :disabled="Boolean(feedBackDetail.backStatus)" @click="Resolved">
                                <span v-if="!loading1">已解决</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </li>
                        <li class="btn" >
                            <Button type="primary">取消</Button>
                        </li>
                    </ul>
               </div>
            </Col>
        </Row>
        <Modal title="图片预览" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
import back from '@/api/feedback.js'
import user from '@/api/user.js'
export default {
    components:{CardPerson},
    inject:['reload'] ,
    data(){
        return {
            loading:false,
            loading1:false,
            //视频
            file:null,
            Video:{},

            backUuid:"",
            userMsg:{},
            dropList:[],//类别列表
            backList:[],//反馈列表
            checkItem:{},//选择类别
            textVal:"",//文本回复内容
            feedBackDetail:{},//反馈详情
            feedBackDetailChat:{},
            imgName: '',
            visible: false,
            uploadList: []//图片列表
        }
    },
    methods: {
        async Resolved(){//已解决
            this.loading1 = true
            let backUuid = this.feedBackDetail.backUuid
            let result = await back.serviceResolved({backUuid,})
            this.textVal = ""
            this.loading1 = false
            if(result && result.errCode){
                this.getFeedBackDetail(backUuid)
            }
        },
        newBuilt(){//新建
            console.log("新建")
            this.feedBackDetail = {}
            this.backUuid = ""
            this.feedBackDetailChat = {}
            this.textVal = ""
            this.uploadList = []
            this.Video = {}
        },
        //上传视频
        handleBeforeUploadVideo(){
            const check = this.Video.videoUrl?true:false;
            if (check) {
                this.$Notice.warning({
                    title: '只能上传一个视频'
                });
            }
            return !check;
        },
        handleVideoSuccess(res, file){
            console.log(res,file)
            if(res && res.errCode === 1){
                this.Video = res.data
            }else{
                this.$Message.error({
                    content: result.errMsg,
                    duration: 4
                });
            }
        },
        change(item){
            if(this.feedBackDetail.type)return;
            let Item = {}
            this.dropList.forEach(res=>{
                if(res.id === item){
                    Item = res
                }
            }) 
            this.checkItem = Item;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {//删除文件返回
            console.log(file,'file')
            let index = this.uploadList.findIndex(res=>{
                return res.url = file.url
            })
            this.uploadList.splice(index,1)
        },
        handleSuccess (res, file) {//上传成功的钩子
            console.log(res,file,'file')
            if(res && res.data){
                this.uploadList.push({url:res.data.photoUrl,photoSize:res.data.photoSize})
                console.log(this.uploadList)
            }else{
                this.$Notice.warning({
                    title: '提示',
                    desc: res.errMsg
                })
            }
            return
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {//文件格式验证失败
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '上传文件' + file.name + '不正确,请选择 jpg 或者 png.'
            });
        },
        handleFormatVideoError (file) {//文件格式验证失败
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '上传文件' + file.name + '不正确, 请选择 mp4/avi/rmvb'
            });
        },
        handleMaxSize (file) {//限制大小
            console.log(file,'file')
            this.$Notice.warning({
                title: '文件大小超出限制',
                desc: '上传' + file.name + '文件太大, 请低于1M'
            });
        },
        handleBeforeUpload () {//上传之前
            console.log(this.uploadList,'this.uploadList')
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        playCustomerBack(){
            this.loading = true
            if(this.feedBackDetail.backUuid){
                this.feedBack(this.feedBackDetail.backUuid)
            }else{
                this.playBtn()
            }
            
        },
        //提交
        async playBtn(){
            let photoUrl = [],photoSize = 0
            this.uploadList.forEach(res=>{
                photoUrl.push(res.url)
                photoSize += res.photoSize
            })
            photoUrl = photoUrl.join(",")
            let data = {
                photoUrl,
                photoSize:photoSize.toFixed(2),
                promblemDetail:this.textVal,
                promblemTypeId:this.checkItem.id,
                videoUrl:this.Video.videoUrl,
                videoSize:this.Video.videoSize
            }
            let result = await back.customerBack(data)
            this.loading = false
            if(result && result.errCode === 1){
                this.$Message.success({
                    content: '提交成功',
                    duration: 4
                });
                console.log(result.data,'result.data')
                this.$router.push('/feedback?id='+result.data.id)
                this.reload()
            }
        },
        //回复
        async feedBack(id){
            let data = {
                backUuid:id,
                backContent:this.textVal
            }
            if(!this.textVal){
                this.$Message.warning({
                    content: '请输入反馈内容',
                    duration: 4
                });
                this.loading = false
                return
            }
            let result = await back.serviceBack(data)
            this.textVal = ""
            this.loading = false
            if(result && result.errCode){
                this.$Message.success({
                    content: "回复成功",
                    duration: 4
                });
                this.getFeedBackDetail(id)
            }
        },
        async getFeedBackDetail(id){//获取回复详情与聊天详情chatRecordString
            this.uploadList = []
            this.backUuid = id;
            let result0 = await back.chatRecord({backUuid:id})//聊天详情
            let result1 = await back.customerFeedBackDetails({backUuid:id})//反馈详情
            if(result0 && result0.errCode === 1){
                this.feedBackDetailChat = result0.data
            }
            if(result1 && result1.errCode === 1){
                this.feedBackDetail = result1.data
                let url = this.feedBackDetail.photoUrl.split(",")
                url.forEach(res=>{
                    this.uploadList.push({
                        url:res
                    })
                }) 
                console.log()
            }
            
        },
        async getProblemType(){//问题类型
            let result = await back.problemType({})
            console.log(result,'result')
            if(result && result.errCode === 1){
                this.dropList = result.data
            }
        },
        async getPersonMessage(){//个人信息
            let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                console.log(this.userMsg)
            }
        },
        async backMessage(){//查询是否添加反馈
            let result = await back.backMessage()
            if(result && result.errCode === 1){
                this.backList = result.data?result.data:[]
                console.log(this.backList)
            }
        }
    },
    mounted() {
        this.backMessage()
        this.getPersonMessage()
        this.getProblemType()//问题类型
        let backUuid = this.$route.query.id
        if(backUuid){
            this.getFeedBackDetail(backUuid)
        }
    },
}
</script>
<style lang="less">
  .feedback{
      height: 100%;
    .left-card{
        padding: 0 10px;
        min-width:200px;
    }
    .content{
        padding: 10px;
        box-sizing: border-box;
        border-left: 1px solid #f5f5f5;
        .ivu-col{
            text-align: left;
            padding:10px 0;
        }
        .file{
            display: flex;
            padding: 10px 0;
            .upload-photo{
                flex: 1;
                padding:0 20px;
                .demo-upload-list{
                    float: left;
                    margin-right: 10px;
                border:1px solid #f5f5f5;
                }
                .ivu-upload{
                    float: left;
                }
            }
            .demo-upload-list{
                width: 58px;
                height: auto;
                min-height: 100px;
                max-height: 100px;
                img{
                    height: 100%;
                    width:100%;
                    min-height: 60px;
                    max-height: 60px;
                }
            }
            .video{
                width: 30%;
                min-width: 280px;
                height: auto;
                video{
                    height: 100%;
                    width:100%;
                }
            }
            .content-back{
                flex: 1;
                .concat{
                    margin:0 10px;
                    border:1px solid #f5f5f5;
                }
                
            }
            .ipt{
                padding:0 20px;
                flex: 1;
            }
            .btn{
                list-style: none;
                flex: 1;
            }
        }
    }
    .message-concat{
        padding: 10px;
        border: 1px solid #f5f5f5;
        margin: 0 20px;
        max-height: 300px;
        overflow: auto;
        li{
            margin-bottom: 10px;
        }
        h4{
            margin: 0;
        }
        .backmsg{
            margin: 0;
            padding: 5px 0;
            line-height: 25px;
                max-width:100%;
            p{
                padding: 5px 10px;
                background-color: #f5f5f5;
                max-width: 100%;
                min-width: 60px;
                display: inline-block;
                text-align:left;
            }
        }
        .right{
            padding-left: 100px;
            box-sizing: border-box;
        }
        .left{
            padding-right: 100px;
            box-sizing: border-box;
        }
        .textarea{
            box-sizing: border-box !important;
            padding: 0 20px;
            text-align: right;
            textarea.ant-input{
                margin: 20px 0;
            }
        }
        
    }
    
}  
</style>