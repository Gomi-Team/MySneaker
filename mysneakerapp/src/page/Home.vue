<template>
  <div class="wrapper">
    <!-- 顶部导航栏 -->
    <Nav-bar title="鞋圈" fixed>
      <Icon slot="right" name="photograph" size="20px" color="black" @click="toUpload"/>
    </Nav-bar>
    <!-- 顶部导航栏 -->

    <!-- 显示列表 -->
    <List class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      
      <div class="dynamic" v-for="(item,index) of loadList" :key="index" @click.stop="toComment(item)">
        <User-Head class="user-head" :headData="item"></User-Head>

        <div  type="flex" justify="space-between" :class="item.p_imgList.length == 2?'two-img':'content-img'">
          <img v-lazy="imgUrl" :class="item.p_imgList.length == 1 ? 'one':item.p_imgList.length == 2 ? 'two': item.p_imgList.length == 3 ? 'three':'four'" v-for="(imgUrl,ind) of item.p_imgList" :key="ind" :src="imgUrl" @click.stop="preview(item.p_imgList,ind)">
        </div>
        
        <div class="content-text">
          <div>{{item.p_text}}</div>
        </div>
        <div class="bottom-action">
          <div class="bottom-action-left">
            <div class="left-icon" v-if="item.p_city != null">
              <Icon size="20px" name="location-o"></Icon>
              <span>{{item.p_city}}</span>
            </div>
            <div class="left-icon">
              <Icon size="20px" name="chat-o"></Icon>
              <span>{{item.p_comment}}</span>
            </div>
            
          </div>
          <Like class="bottom-action-right" :likeData="item"></Like>
        </div>
      </div>
    </List>
    <!-- 显示列表 -->
  </div>
</template>

<script>
import Like from '../components/Like';
import UserHead from '../components/UserHead';

import {
  
  NavBar,
  Uploader,
  Icon,
  List,
  Lazyload,
  ImagePreview,
  Row,
  Col,
  Popup
} from "vant";

export default {
  name: "Home",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      dataList: [],
      imgList: [],
      show:false,
      loadList:[]
    };
  },
  computed: {
    uid(){
      this.$store.state.uid
    },
    
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.loading = true;
      console.log(123);
      let uid_query = {
        uid:this.$store.state.uid
      };
      
      axios.post("https://www.gomi.site/postings",uid_query)
      .then(res => {
        console.log(res.data);
        let postings = res.data.list;
        let icon = res.data.icon;
        postings.map((value,index,arr) => {
          value.p_imgList = value.p_imgList.split(",");
          if(icon.find(v=>v==value.pid)){
            value.likeState = {
                  state: true,
                  style: "like"
              }
          }else{
                value.likeState = {
                  state: false,
                  style: "like-o"
              } 
            }
        });
        
        if(this.loadList.length + 5 > postings.length){
          this.loadList = postings.slice(0,postings.length);
          
          if(this.loadList.length == postings.length){
            this.loading = false;
            this.finished = true;
          }else {

          }
        }else{
          this.loadList = postings.slice(0,this.loadList.length + 5)
          this.loading = false;
          
        }
        
        console.log(postings)
        //this.dataList = postings;
        
      });
    },
    toComment(item){
      //this.$router.push('/Comment');
      this.$router.push({
          name: 'Comment',
          params: {
            id: JSON.stringify(item)
          }
        })
      this.$store.commit("tabState", 1);
      this.show = true;
    },
   
    toUpload() {
      if(this.$store.state.uid == ''){
        this.$router.push('/Login');
        this.$store.commit('tabState',1);
      }else{
        this.$router.push("/Upload");
        this.$store.commit("tabState", 1);
      }
      
    },
    preview(value,index){
      ImagePreview({
        images: value,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  },
  
  created() {
    // let uid_query = {
    //   uid:this.$store.state.uid
    // };
    
    // axios.post("https://www.gomi.site/postings",uid_query)
    // .then(res => {
    //   console.log(res.data);
      
    //   let postings = res.data.list.slice(0,5);
    //   let icon = res.data.icon;
    //   postings.map((value,index,arr) => {
    //     value.p_imgList = value.p_imgList.split(",");
    //     if(icon.find(v=>v==value.pid)){
    //       value.likeState = {
    //             state: true,
    //             style: "like"
    //         }
    //     }else{
    //           value.likeState = {
    //             state: false,
    //             style: "like-o"
    //         } 
    //       }
    //   });
    //   console.log(postings)
    //   this.dataList = postings;

    // });
  },
  updated() {
    
  },
  components: {
    
    NavBar,
    Uploader,
    Icon,
    List,
    
    Row,
    [Col.name]:Col,
   
    Popup,
    Comment,
    Like,
    UserHead
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@mixin flex-al-center {
  display: flex;
  align-items: center;
}
@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper {
  padding-top: 35px;
  
  background: rgba(0, 0, 0, 0.03);
  .list {
    margin-bottom: 40px;
  }
  .dynamic {
    margin: 10px auto;
    background: rgb(255, 255, 255);
    padding-bottom: 3px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .two-img{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    .two {
      width: 49%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content-img {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: 300px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    .two {
      width: 49%;
      height: 100%;
      
    }
    .one {
      width: 100%;
      height: 100%;
    }

    .three {
      &:nth-child(1){
        width:100%;
        height: 50%;
        margin-bottom:3px;
      }
      &:nth-child(2){
        width:49%;
        height: 50%;
      }
      &:nth-child(3){
        width:49%;
        height: 50%;
      }
    }
      .four {
        &:nth-child(1){
          width:49%;
          height: 50%;
          margin-bottom:3px;
        }
        &:nth-child(2){
          width:49%;
          height: 50%;
          margin-bottom:3px;
        }
        &:nth-child(3){
          width:49%;
          height: 50%;
        }
        &:nth-child(4){
          width:49%;
          height: 50%;
        }
    }
    img {
      // width: 50%;
      // height: 50%;
      // margin: 3px;
      object-fit: cover;
      // display: inline-block;
    }
  }
  .content-text {
    @include flex-al-center();
    padding: 10px 0 5px 10px;
  }
  .bottom-action {
    @include flex-between();
    padding: 5px;
    
    .bottom-action-left {
      .left-icon {
        display: flex;
        align-items: center;
        margin-right: 5px;
        font-size: 10px
      }
    }
    .bottom-action-left,
    .bottom-action-right {
      @include flex-between();
    }
  }
  img {
    width: 100%;
  }
}
</style>