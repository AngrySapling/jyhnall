<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light" :active-name="activeRoute" >
                    <div :class="isShow?'phoneClass':'layout-logo'">
                        <a href="https://www.easeway.co/">
                            <img src="@/assets/images/icon0.png" alt="">
                        </a>
                    </div>
                    <Button  v-if="isShow" @click="isShowmenu"><Icon type="md-menu" size="32" color="#000" /></Button>
                    <div class="layout-nav" v-show="!isShow">
                        <router-link to="/feedback">
                            <Menu-item name="/feedback">
                                <Icon type="md-clipboard" />
                            {{I18n.main[0]}}
                            </Menu-item>
                        </router-link>
                        <router-link to="/evaluate">
                            <Menu-item name="/evaluate">
                                <Icon type="ios-star" />
                             {{I18n.main[1]}}
                            </Menu-item>
                        </router-link>
                        <router-link to="/order">
                            <Menu-item name="/order">
                                <Icon type="ios-cart" />
                                {{I18n.main[2]}}
                            </Menu-item>
                        </router-link>
                        <Submenu name="/person">
                            <template slot="title">
                                {{$store.state.userMsg.feedbackName}}
                            </template>
                                <router-link to="/person">
                                    <Menu-item name="/person"> {{I18n.main[4]}}</Menu-item>
                                </router-link>
                                <Menu-item name="/quit" >
                                    <p @click="quit"> {{I18n.main[5]}}</p> 
                                </Menu-item>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout class="Layout-content"> 
                <Content class="Layout-content-center">
                    <Breadcrumb style="text-align: left;padding:5px;">
                        <BreadcrumbItem >{{activeName}}</BreadcrumbItem>
                    </Breadcrumb>
                    <router-view v-if='isReload'></router-view>
                </Content>
                <Footer class="layout-footer-center"> <div class="bottom1">
                    <span>{{I18n.main[6]}}</span>
                    <i class="o_xs-hide "> | </i>
                    <span>{{I18n.main[7]}}</span>
                </div></Footer>
            </Layout>
            
            </Layout>
        <Drawer placement="left" :closable="false" v-model="isShow1">
            <Row>
                <Col span="8">
                    <div class="icon">
                        <a href="https://www.easeway.co/">
                            <img src="@/assets/images/icon0.png" alt="">
                        </a>
                    </div>
                    <Menu theme="light" accordion :active-name="activeRoute">
                        <router-link :class="{'isA':activeRoute === '/feedback'}" to="/feedback">
                            <Menu-item name="/feedback">
                                <Icon type="md-clipboard" />
                                {{I18n.main[0]}}
                            </Menu-item>
                        </router-link>
                        <router-link :class="{'isA':activeRoute === '/evaluate'}"  to="/evaluate">
                            <Menu-item name="/evaluate">
                                <Icon type="ios-star" />
                                {{I18n.main[1]}}
                            </Menu-item>
                        </router-link>
                        <router-link :class="{'isA':activeRoute === '/order'}"  to="/order">
                            <Menu-item name="/order">
                                <Icon type="ios-cart" />
                                {{I18n.main[2]}}
                            </Menu-item>
                        </router-link>
                        <Submenu name="/person0">
                            <template slot="title">
                                <Icon type="ios-cog" />{{I18n.main[3]}} 
                            </template>
                            <router-link :class="{'isA':activeRoute === '/person'}"  to="/person">
                                <Menu-item name="/person">{{I18n.main[4]}}</Menu-item>
                            </router-link>
                            <Menu-item name="/quit"><p @click="quit">{{I18n.main[5]}}</p> </Menu-item>
                        </Submenu>
                    </Menu>
                </Col>
            </Row>
        </Drawer>
    </div>
</template>
<script>
import {removeToken,removeUser} from '@/utils/storage'
export default {
    provide(){
        return {
            reload:this.reload
        }
    },
    data () {
        return {
            activeRoute:'/feedback',
            activeName:'',
            isReload:true,
            screenWidth:'',
            screenHeight:'',
            isShow:false,
            isShow1:false,
        }
    },
    methods: {
        quit(){
            //删除token
            removeToken()
            removeUser()
            this.$router.push("/login")
        },
        isShowmenu(){
            this.isShow1 = true;
        },
        reload () {
        this.isReload = false
        this.$nextTick(function () {
            this.isReload = true
        })
        },
        convertRoute(route){//暂时这样解决->到时候再说
            let backroute = ""
            switch(route){
                case '/feedback':
                    backroute = this.I18n.main[0];
                break;
                case '/evaluate':
                    backroute = this.I18n.main[1];
                break;
                case '/order':
                    backroute = this.I18n.main[2];
                break;
                case '/person':
                    backroute =this.I18n.main[4];
                break;
            }
            return backroute
        }
    },
    watch: {
        '$route':function(newVal){
            this.activeRoute = newVal.path
            this.activeName = this.convertRoute(newVal.path)
        }
    },
  mounted() {
        this.activeRoute = this.$route.path
        this.activeName = this.convertRoute(this.$route.path)
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        if(this.screenWidth <= 750){
            this.isShow = true
        }
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
                this.screenHeight = document.body.clientHeight;
            if(this.screenWidth <= 750){
                this.isShow = true
            }else{
                this.isShow = false
            }
            })();
        };
    },
}
</script>
<style lang="less">
 .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height: 100vh;
    overflow: hidden;
    .Layout-content{
        padding: 0 10px;
    }
    .Layout-content-center{
        padding: 10px 0;
    }
}
/* .isA{
    color: #2d8cf0;
} */
.ivu-menu {
    width: 100%;
    text-align: left;
    .ivu-btn{
        padding: 0 6px;
    }
}
.feedback,.evaluate,.order{
    height: 100%;
    .ivu-row{
        height: 100%;
    }
}
.left{
    padding: 0 10px;
    min-width:220px;
    margin-bottom: 10px;
}
.right{
  background: #fff;
}
.ivu-layout{
    height: 100vh ;
    overflow: auto;
}

.icon{
        padding: 10px;
        height: 64px;
        img{
            height:100%;
            width:auto;
            display: block;
            margin:0 auto;
        }
    }
.ivu-layout-header{
    background-color: #fff;
    display: flex;
    padding: 0 20px;
    .ivu-btn-default{
        display: block;
        position: absolute;
        top: 16px;
    }
}
.ivu-menu-submenu-title{
    img{
        height: 44px;
        width:auto;
       vertical-align:middle;
    }
}
.ivu-menu-horizontal.ivu-menu-light:after{
    background-color: #fff;
}

.layout-logo{
    border-radius: 3px;
    float: left;
    height: 64px;
    padding: 10px;
    box-sizing: border-box;
    img{
      height: 44px;
      width:auto;
    }
}
.layout-logo-left{
    width: 90%;
    height: 20px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
.layout-hide-text .layout-text{
    display: none;
}
.ivu-col{
    transition: width .2s ease-in-out;
}
.layout-nav{
    flex: 1;
    margin: 0 auto;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
    a{
        color:#515a6e;
    }
    a:hover{
        color: #2d8cf0;
    }
}
.layout-footer-center{
    text-align: center;
}
.phoneClass{
    border-radius: 3px;
    height: 64px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 44px;
      width:auto;
      vertical-align: middle;
    }
}
.phone-menue{
    height: 100vh;
    width: 100vh;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
}
.ivu-drawer-body{
    padding: 0 !important;
    .ivu-col,.ivu-menu-vertical{
        width: 100% !important;
    }
    a{
        color:#515a6e;
    }
} 
@media screen and (max-width: 576px) {
    .left{
        padding: 0;
    }
    .feedback, .evaluate, .order, .right{
        height: auto;
    }
    .person .content{
        width: 96% !important;
        margin:0 auto;
       
    }
}
</style>