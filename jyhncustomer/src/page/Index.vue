<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light" :active-name="activeName" >
                    <div :class="isShow?'phoneClass':'layout-logo'">
                    <img src="@/assets/images/icon0.png" alt="">
                    </div>
                    <Button  v-if="isShow" @click="isShowmenu"><Icon type="md-menu" size="32" color="#000" /></Button>
                    <div class="layout-nav" v-if="!isShow">
                        <Menu-item name="/feedback">
                            <Icon type="md-clipboard" />
                            <router-link to="/feedback">客户反馈</router-link>
                        </Menu-item>
                        <Menu-item name="/evaluate">
                            <Icon type="ios-star" />
                            <router-link to="/evaluate">客户评价</router-link>
                        </Menu-item>
                        <Menu-item name="/order">
                            <Icon type="ios-cart" />
                            <router-link to="/order">订单管理</router-link>
                        </Menu-item>
                        <Submenu name="/">
                            <template slot="title">
                                <img src="@/assets/images/icon1.png" alt="">
                            </template>
                                <Menu-item name="/person"><router-link to="/person">个人中心</router-link></Menu-item>
                                <Menu-item name="/">退出</Menu-item>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout class="Layout-content">
                <Content class="Layout-content-center">
                    <router-view v-if='isReload'></router-view>
                </Content>
                <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
            </Layout>
            
        </Layout>
        <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="isShow1">
            <Row>
                <Col span="8">
                    <Menu theme="dark" accordion :active-name="activeName">
                        <Menu-item name="/feedback">
                            <Icon type="md-clipboard" />
                            <router-link to="/feedback">客户反馈</router-link>
                        </Menu-item>
                        <Menu-item name="/evaluate">
                            <Icon type="ios-star" />
                            <router-link to="/evaluate">客户评价</router-link>
                        </Menu-item>
                        <Menu-item name="/order">
                            <Icon type="ios-cart" />
                            <router-link to="/order">订单管理</router-link>
                        </Menu-item>
                    </Menu>
                </Col>
            </Row>
        </Drawer>
    </div>
</template>
<script>
export default {
    provide(){
        return {
            reload:this.reload
        }
    },
  data () {
      return {
        activeName:'/feedback',
        isReload:true,
        screenWidth:'',
        screenHeight:'',
        isShow:false,
        isShow1:false,
      }
  },
  computed: {
      rotateIcon () {
      },
      menuitemClasses () {
      }
  },
  methods: {
    isShowmenu(){
        this.isShow1 = true;
    },
    reload () {
      this.isReload = false
      this.$nextTick(function () {
        this.isReload = true
      })
    }
  },
  watch: {
      '$route':function(newVal,oldVal){
            this.activeName = newVal.path
        }
  },
  mounted() {
        this.activeName = this.$route.path
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
.ivu-menu {
    width: 100%;
    text-align: left;
    .ivu-btn{
        padding: 0 6px;
    }
}
.feedback,.evaluate,.order,.right{
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
} 
@media screen and (max-width: 576px) {
    .left{
        padding: 0;
    }
    .feedback, .evaluate, .order, .right{
        height: auto;
    }
}
</style>