import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLogin:false,
        uid:"",
        tabShow:true,
        tabActive:0
    },
    mutations:{
        loginState(state,status,uid){
            state.uid = sessionStorage.getItem('uid');
            if(state.uid != ''){
                state.isLogin = true;
            }else{
                state.isLogin = false;
            }
            state.isLogin = status;
        },
        tabState(state,num){
            if(num == 0){
                state.tabShow = true;
            }else {
                state.tabShow = false;
            }
            
        },
        tabActive(state,index){
            state.tabActive = index
        }
       
    },
    
});
export default store;