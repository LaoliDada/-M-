<template>
  <div class="find-wrap">
    <hellow-world title="选择收货地址" address="/homePage"></hellow-world>
    <div class="input-address-wrap">
      <i class="fa fa-search"></i>
      <input @keyup.enter="serInpAddAct(inpAddress)" ref="addinp" type="text" v-model="inpAddress" placeholder="请输入地址">
    </div>
    <div class="nowAddress" v-if="thisAddress===0">
      <p>当前地址</p>
      <p><span>{{addressName}}</span></p>
    </div>
    <section style="overflow-y: auto;" v-if="thisAddress===1">
      <ul>
        <li class="serAddItem" @click="clickTheNewAddTheTem({name:item.name,latitude:item.latitude,longitude:item.longitude})" v-for="(item,ind) in serInpAdd" :key="ind">
          <p class="addName">{{item.name}}</p>
          <p class="addAddress">{{item.address}}</p>
        </li>
      </ul>
    </section>
    <section class="noadd" v-if="thisAddress===2">
      <div class="nowAddress">
        <p>当前地址</p>
        <p><span>{{addressName}}</span></p>
      </div>
      <div class="noadd2">
        <img src="//fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif">
        <p style="font-size:1.4rem;color:#6a6a6a;padding:.6rem 0;">没有搜索结果</p>
        <p style="font-size:1rem;color:#999;transform:scale(.8)">换个关键字试试</p>
      </div>
    </section>
  </div>

</template>

<script>
import {mapState,mapActions} from "vuex";
import HellowWorld from "./HelloWorld.vue"
export default {
  name: "Find",
  data() {
    return {
        inpAddress:"",
        thisAddress:0
    };
  },
  mounted(){
    this.$refs.addinp.focus();
  },
  watch:{
    serInpAdd(val){
      if(val.length>0){
        this.thisAddress = 1;
      }else{
        this.thisAddress = 2;
      } 
    }
  },
  computed:{
     ...mapState({
       addressName:"addressName",
       serInpAdd:"serInpAdd"
     })
  },
  methods:{
    ...mapActions({
      serInpAddAct:"serInpAddAct"
    }),
    serInpAddActTheP(inpAddress){
      this.serInpAddAct(inpAddress);
      this.$refs.addinp.blur();
    },
    clickTheNewAddTheTem(option){
      this.$store.commit("clickTheNewAdd",option);
      this.$store.dispatch("getTuiJianShop",{offset:0});
      this.$router.push("/homepage");
    }
  },
  components: {
    HellowWorld
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.serAddItem{
  padding:1rem;
  background:#fff;
  border-bottom:1px solid #f0f0f0;
  .addName{
    font-size:1.4rem;
    font-weight:600;
    margin-bottom: .4rem;
  }
  .addAddress{
    font-size:1rem;
    color: #333;
  }
}
.nowAddress{
    width:100%;
    margin-top:1rem;
    p{
        font-size:1.2rem;
        box-sizing: border-box;
      &:first-of-type{
        padding:.5rem 1rem 1rem;
        color:#666;
      }
      &:last-of-type{
        background:#fff;
        height:3.4rem;
        line-height:3.4rem;
        padding:0 1rem;
        color:#000;
        font-weight:600;
        span{
          font-weight:600;
          display:block;
          max-width:80%;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
    }
  }
  .noadd{
    width:100%;
    .noadd2{
      padding-top:20%;
      p{
        width:100%;
        text-align:center;
      }
    }
    p{
      text-align:left;
    }
    img{
      width:60%;
      display:block;
      margin:0 auto;
    }
  }
.input-address-wrap{
  background:#fff;
  padding:1rem 1.5rem;
  position:relative;
  
  input{
    width:100%;
    height:3rem;
    border:none;
    background:#f2f2f2;
    border-radius:1px;
    padding:0 2.6rem;
    box-sizing:border-box;
    outline: none;
    font-size:1.2rem;
  }
  .fa{
    position:absolute;
    top:1.8rem;
    left: 2.5rem;
    font-size:1.4rem;
    color:#aaa;
  }
}
   .find-wrap{
     width:100%;
     height:100%;
     position:absolute;
     left:0px;
     top:0px;
     z-index:1099;
     background:#f4f4f4;
   }
</style>
