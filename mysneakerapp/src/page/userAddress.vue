<template>
  <div>
    <nav-bar title="地址设置" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <address-edit
      :area-list="areaList"
      show-postal
      show-search-result
      :search-result="searchResult"
      @save="onSave"
    />
  </div>
</template> 
<script>
import { AddressEdit, NavBar } from "vant";
import { area } from "../components/area";
export default {
  name: "userAddress",
  components: {
    AddressEdit,
    NavBar
  },
  data() {
    return {
      areaList: area,
      searchResult: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      let data = {
        name: "",
        tel: "",
        address: "",
        areaCode: ""
      };
      data.name = content.name;
      data.tel = content.tel;
      data.address = `${content.province}/${content.city}/${content.county}/${
        content.addressDetail
      }`;
      data.areaCode = content.areaCode;
      this.$store.commit("changeAddress", data);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.van-address-edit {
  span {
    color: aqua !important;
  }
}
</style>
