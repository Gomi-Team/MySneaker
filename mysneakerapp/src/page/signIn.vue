<template>
  <div class="wrapper">
      <div class="back">
        <Icon size="20px" name="cross" @click="back"></Icon>
      </div> 
      <div class="content">
        <div class="logo">
            
            <!-- <img src="../../static/img/shoeAJ.png" alt=""> -->
            <p>MySneaker</p>
        </div>
        <div class="signIn">
            
            <div class="user-name">
                <input type="text" placeholder="请输入用户名" v-model="user.username">
            </div>
            <div class="user-pwd">
                <input type="password" placeholder="请输入密码" v-model="user.password">
            </div>
            <div class="sign-btn">
                <Button type="primary"  @click="signIn()">登录</Button>
            </div>
        </div>
      </div>
      
    
  </div>
</template>

<script>
import {  NavBar, Uploader, Icon , Button, Field, CellGroup ,Toast } from 'vant';
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active:0,
      list: [],
      loading: false,
      finished: false,
      user:{
        username:"",
        password:""
      }
      
    }
  },
  computed:{
      loginState(){
          return this.$store.state.isLogin
      },
  },
  methods: {
    back(){
        this.$router.back(-1);
        //this.$store.commit('tabState',0);
    },
    onLoad() {
      // 异步更新数据
     
    },
    login(){
        this.$store.commit('loginState');
        console.log(1)
    },
    signIn(){
        axios.post('https://www.gomi.site/signIn',this.user)
        .then((res)=>{
            
            console.log(res);
            if(res.data.status == 0){
                this.$toast({
                    message: "登陆失败，用户名或密码错误",
                })
            }else{
                this.$store.commit('tabState',0);
                this.$router.push('/My');
                sessionStorage.setItem('uid',JSON.stringify(res.data.results[0].uid));
                this.$store.commit('loginState',true);
            }
            
            
        })
      
    }
  },
  components:{
    
    NavBar,
    Uploader,
    Icon,
    Button,
    Field,
    CellGroup,
    Toast
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    .content {
        width: 100%;
    }
    height: 100%;
    
    .back {
        position: absolute;
        top:30px;
        left:30px;

    }
    .logo{
        width: 50%;
        text-align: center;
        margin: auto;
        p{
            font-size: 30px;
            font-weight: bold;
        }
        img {
            width:70%;
            
        }
    }
    
    .signIn {
        width: 90%;
        text-align: center;
        margin: auto;
        div {
            width: 100%;
        }
        input {
            height: 40px;
            width: 100%;
            border:none;
            border-bottom: 1px solid rgba(0,0,0,0.3)
        }
        .sign-btn {
            width: 100%;
            margin-top: 10px;
            Button {
                background: black;
                width: 100%;
                border: none;
            }
        }
    }

    
}
</style>