<template>
    <div class="feedback">
        <Row class="back-row">
            <Col :xs="24" :sm="10" :md="8" :lg="6"  class="left">
                <div>
                    <Card-person @toDetail="toDetail" @newBuilt="newBuilt" :title=" I18n.feedback[10]" :userMsg="userMsg" :showback="true" :backList="backList"></Card-person>
                </div>
            </Col>
            <Col :xs="24" :sm="14" :md="16" :lg="18" class="right">
               <div class="content">
                    <Row>
                        <Col :xs="24" :sm="12" :md="8" :lg="8">
                            <span>{{I18n.feedback[0]}} : </span>
                            <Dropdown trigger="click" style="margin-left: 20px"  @on-click="change">
                                <a href="javascript:void(0)">
                                    {{feedBackDetail.type?feedBackDetail.type:checkItem.type?checkItem.type:I18n.feedback[1]}}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list" v-if="!backUuid">
                                    <DropdownItem :name="item.id" v-for="(item,index) in dropList" :key="item.id">{{item.type}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col :xs="24" :sm="12" :md="8" :lg="8" v-if="backUuid">
                            <span>{{I18n.feedback[2]}} : </span>
                            <span>{{feedBackDetail.createTime}}</span>
                        </Col>
                        <Col  :xs="24" :sm="12" :md="8" :lg="8" v-if="backUuid">
                            <span>{{I18n.feedback[3]}} : </span>
                            <span>{{feedBackDetail.backStatus?I18n.feedback[4]:I18n.feedback[5]}}</span>
                        </Col>
                    </Row>
                    <div class="file">
                        <div>{{I18n.feedback[6]}} : </div>
                        <div class="upload-photo">
                            <div style="text-align:left;padding-bottom:10px;">{{I18n.feedback[7]}}</div>
                            <div style="overflow: hidden;" >
                                <div class="demo-upload-list" v-for="item in uploadList">
                                    <template>
                                        <img :src="item.url">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                        </div>
                                    </template>
                                    <template >
                                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
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
                                    :action="action0"
                                    style="display: inline-block;width:58px;border:1px solid #f5f5f5;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="ios-camera" size="20"></Icon>
                                    </div>
                                </Upload>
                            </div>
                            <div style="text-align:left;padding: 10px 0;">{{I18n.feedback[8]}}</div>
                            <Upload
                                v-if="!backUuid"
                                name="video"
                                :on-success="handleVideoSuccess"
                                :before-upload="handleBeforeUploadVideo"
                                :on-format-error="handleFormatVideoError"
                                :format="['avi','mp4','rmvb','MOV']"
                                :action="action1">
                                <Button icon="ios-cloud-upload-outline">{{I18n.feedback[9]}}</Button>
                            </Upload>
                            <div v-if="file !== null">{{ file.name }}</div>
                            <div v-if="backUuid && feedBackDetail.videoUrl" class="video" >
                                <video :src="feedBackDetail.videoUrl" controls="controls"></video>
                            </div>
                        </div>
                        
                    </div>
                    <div class="file" v-if="feedBackDetail.backUuid">
                        <span>{{I18n.feedback[10]}} : </span>
                        <div class="content-back">
                            <ul class="message-concat">
                                <li :key="index" v-for="(item,index) in feedBackDetailChat" :style="{listStyle:'none',textAlign:item.backName === I18n.feedback[11]?'right':'left'}" :class="[item.backName === I18n.feedback[11]?'right':'left']">
                                    <h4 v-if="item.backName === I18n.feedback[11]">
                                        <span :style="{color:'#ccc',fontWeight:200,fontSize:'14px'}">{{item.backTime}} : </span>
                                        <span>{{item.backName}}</span>
                                    </h4>
                                    <h4  v-if="item.backName !== I18n.feedback[11]">
                                        <span>{{item.backName}}</span>
                                        <span style="color:'#ccc';font-weight:200;font-size:'14px'">{{item.backTime}} : </span>
                                    </h4>
                                    <div class="backmsg"> <p >{{item.backContent}}</p> </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="file" v-if="!feedBackDetail.backStatus">
                        <span>{{I18n.feedback[12]}} : </span>
                        <div class="ipt">
                            <Input v-model="textVal" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入反馈内容" />
                        </div>
                    </div>
                    <ul class="file">
                        <li class="btn">
                            <Button type="primary" :loading="loading" :disabled="Boolean(feedBackDetail.backStatus)" @click="playCustomerBack">
                                <span v-if="!loading">{{feedBackDetail.backUuid?I18n.feedback[12]:I18n.feedback[15]}}</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </li>
                        <li class="btn">
                            <Button type="primary" :loading="loading1" :disabled="Boolean(feedBackDetail.backStatus)" @click="Resolved">
                                <span v-if="!loading1">{{I18n.feedback[4]}}</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </li>
                        <li class="btn" v-if="!Boolean(feedBackDetail.backStatus)">
                            <Button type="primary">{{I18n.feedback[16]}}</Button>
                        </li>
                    </ul>
               </div>
            </Col>
        </Row>
        <Modal :title="I18n.feedback[17]" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import CardPerson from '@/components/cardPerson'
import config from '@/api/config.js'
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
            action0:config.url_config+'/wechat/uploadPhotoFile',
            action1:config.url_config+'/wechat/uploadVideoFile',
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
        async Resolved(){//{{I18n.feedback[4]}}
            this.loading1 = true
            let backUuid = this.feedBackDetail.backUuid
            let result = await back.serviceResolved({backUuid,})
            this.textVal = ""
            this.loading1 = false
            if(result && result.errCode === 1){
                this.getFeedBackDetail(backUuid)
            }
        },
        newBuilt(){//新建
            console.log("新建")
            this.$router.push("/feedback")
            this.reload()
        },
        //上传视频
        handleBeforeUploadVideo(){
            const check = this.Video.videoUrl?true:false;
            if (check) {
                this.$Notice.warning({
                    title: this.I18n.tips.feedback[0]
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
            console.log(res,file,'成功')
            if(res && res.data){
                this.uploadList.push({url:res.data.photoUrl,photoSize:res.data.photoSize})
                console.log(this.uploadList)
            }else{
                this.$Notice.warning({
                    title:  this.I18n.tips.feedback[1],
                    desc: res.errMsg
                })
            }
            return
        },
        handleFormatError (file) {//文件格式验证失败
            this.$Notice.warning({
                title: this.I18n.tips.feedback[2],
                desc: this.I18n.tips.feedback[3]+ file.name +  this.I18n.tips.feedback[4]
            });
        },
        handleFormatVideoError (file) {//文件格式验证失败
            this.$Notice.warning({
                title:  this.I18n.tips.feedback[2],
                desc: this.I18n.tips.feedback[3]+ file.name +  this.I18n.tips.feedback[5]
            });
        },
        handleMaxSize (file) {//限制大小
            console.log(file,'file')
            this.$Notice.warning({
                title:  this.I18n.tips.feedback[6],
                desc:  this.I18n.tips.feedback[7] + file.name + this.I18n.tips.feedback[8]
            });
        },
        handleBeforeUpload () {//上传之前
            console.log(this.uploadList,'this.uploadList')
            const check = this.uploadList.length < 5;
            if(!check){
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
                videoSize:this.Video.videoSize,
            }
            let result = await back.customerBack(data)
            this.loading = false
            if(result && result.errCode === 1){
                this.$Message.success({
                    content: this.I18n.tips.feedback[9],
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
                    content:this.I18n.tips.feedback[10],
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
                    content:this.I18n.tips.feedback[11],
                    duration: 4
                });
                this.getFeedBackDetail(id)
            }
        },
        toDetail(id){
            this.$router.push("/feedback?id="+id)
            this.reload()
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
                    if(res){
                        this.uploadList.push({
                            url:res
                        })
                    }
                }) 
                console.log(url,'this.uploadList')
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
                this.$store.commit('getUser',result.data)
                let status = result.data.customerBindStatus;
                let _this = this;
                if(!status){
                    this.$Modal.warning({
                        title: this.I18n.tips.feedback[1],
                        content:this.I18n.tips.feedback[12],
                        onOk:function(){
                            _this.$router.push("/person")
                        }
                    });
                }
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
    .ivu-dropdown .ivu-select-dropdown{
        overflow: auto;
        max-height: 300px;
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
                    width: 58px;
                    height: auto;
                    /* min-height: 100px; */
                    max-height: 100px;
                    img{
                        height: 100%;
                        width:100%;
                        min-height: 60px;
                        max-height: 60px;
                    }
                }
                .ivu-upload{
                    float: left;
                }
            }
            
            .video{
                width: 25%;
                min-width: 150px;
                max-width: 200px;
                height: auto;
                video{
                    height: 100%;
                    width:100%;
                    object-fit: fill;
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