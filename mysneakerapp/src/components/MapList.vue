<template>
  <div class="map">
    <!-- 顶部导航栏 -->
    <Nav-bar v-if="index != ''" title="" fixed >
      <Icon slot="left" name="arrow-left" size="20px" color="black" @click="back"/>
      
    </Nav-bar>
    <!-- 顶部导航栏 -->
    <div class="rock" v-if="index != ''"></div>
    <!-- 显示列表 -->
    <div class="list">
      <div class="dynamic" v-for="(item,index) of loadList" :key="index" @click="toPosting(item)" >
           <img v-lazy="item.p_imgList[0]" :src="item.p_imgList[0]" alt="">
         
      </div>
    </div>
    
    <!-- <List class="list" v-model="loading" :finished="finished" finished-text="没有更多了"  immediate-check @load="onLoad">
      
      
    </List> -->
    <!-- 显示列表 -->
    
  </div>
</template>

<script>

import Vue from 'vue' ;

import { Tabbar, TabbarItem, NavBar, Uploader, Icon ,List ,Lazyload} from 'vant';


export default {
  name: 'MapList',
  props:['index'],
  data () {
    return {
      
      
      list: [],
      loading: false,
      finished: false,
      zoom:16,
      loadList:[],
      nearPostings:[]
    }
  },
  methods: {
    loadingGet:function(loaddata,resdata,icon,loadnum){
        resdata.map((value,index,arr) => {
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
        
        let selectData = resdata.filter(val=>val.p_city==this.city);
        
        if(loaddata.length + loadnum > selectData.length){
              this.loading = true;
              loaddata = selectData.slice(0,selectData.length);
              this.loadList = loaddata;
              if(loaddata.length == selectData.length){
                this.loading = false;
                this.finished = true;
              }else {

              }
            }else{
                loaddata = selectData.slice(0,loaddata.length + loadnum)
                this.loading = false;
                this.loadList = loaddata;
                
                //return loaddata
                
            }

    },

    toPosting(item){
      this.$router.push({
          name: 'Comment',
          params: {
            id: JSON.stringify(item)
          }
        })
      this.$store.commit("tabState", 1);
    },
    onLoad() {
      // 异步更新数据

      //this.loading = true;
      let uid_query = {
        uid:this.$store.state.uid
      };
      //this.loading = true;
      axios.post("https://www.gomi.site/postings",uid_query)
      .then(res => {
        console.log(res.data);
        let icon = res.data.icon;
        let postings = res.data.list;
        
        
        
        postings.map((value,index,arr) => {
          if(this.city == value.p_city){
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
            this.nearPostings.push(value)
            console.log(2)
          }
          
        });
        //this.loadList = postings;
        this.loadingGet(this.loadList,postings,icon,4);
         
      })
      // .then(res=>{
      //   //console.log(this.nearPostings);
      //   this.loadingGetSearch(this.loadList,this.nearPostings,6)
      // })
    },
    back(){
        this.$router.back(-1);
        this.$store.commit('tabState',0);
    },
  },
  created() {
    console.log(this.$route.query)
    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }
    let uid_query = {
        uid:this.$store.state.uid
      };
      //this.loading = true;
      axios.post("https://www.gomi.site/postings",uid_query)
      .then(res => {
        console.log(res.data.list);
        let postings = res.data.list;
        if(this.$route.query.id == 1){
              postings.sort(compare('p_date'))
            }else if(this.$route.query.id  == 2){
              postings.sort(compare('p_like'))
            }else if(this.$route.query.id  == 3){
              postings.sort(compare('p_comment'))
            }
        
        postings.map((value,index,arr) => {
          if(this.$store.state.city == value.p_city){
            value.p_imgList = value.p_imgList.split(",");
            if(res.data.icon.find(v=>v==value.pid)){
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
            this.nearPostings.push(value)
            
          }
          
        });
        this.loadList = this.nearPostings
        
        
      })
  },
  mounted() {
    
  },
  updated() {
    
  },
  components:{
    
    NavBar,
    Uploader,
    Icon,
    List,
    Lazyload
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.rock {
  height: 50px;
  width: 100%;
  
}
.list {
  width: 95%;
  margin:auto;
  
  display: flex;
  justify-content: space-between;
  
  flex-wrap: wrap;
  padding-bottom: 60px;
  .dynamic {
    width: 33%;
    height: 110px;
    overflow: hidden;
    margin-bottom: 1.5px;
    img {
      width: 100%;
      height: 100%;
      object-fit:cover;
    }
  }

}


</style>