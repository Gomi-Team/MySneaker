<template>
  <div>
    <nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed/>
    <div class="posting">
      <postings v-for="i in user.postings" :key="i.id" :prop="i" :user="user"></postings>
    </div>
  </div>
</template>
<script>
import { NavBar } from "vant";
import postings from "./FollowUser/postings";
export default {
  name: "mypostings",
  data() {
    return {
      postings: [],
      title: "",
      user: {
        message: {},
        postings: {}
      }
    };
  },

  created() {
    this.title = "我赞过的";
    axios
      .post("https://www.gomi.site/postings", {
        uid: this.$store.state.uid
      })
      .then(res => {
        console.log(res.data);
        this.user = {
          message: {
            id: 1,
            icon: res.data.icon,
            text: "like"
          },
          postings: res.data.likeList
        };
        console.log(this.user.message);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  components: {
    NavBar,
    postings
  }
};
</script>
<style lang="scss" scoped>
.posting {
  margin-top: 50px;
}
</style>

