<template>
  <div class="title-wrap">
    <span><span class="fa fa-angle-left" style="padding-right:10px;" @click="backword"></span><slot></slot></span>
    <span>{{title}}</span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  methods:{
    backword(){
      if(!this.address){
        this.$router.go(-1)
      }else{
        this.$router.push("/homePage");
      }
     
    }
  },
  props:['title',"address"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title-wrap{
  background-image: linear-gradient(90deg,#0af,#0085ff);
  height: 3.8rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding:0 15px;
  span{
    font-size:1.4rem;
    color:#fff;
    display:block;
    min-width: 20px;
    &:nth-child(2){
      font-weight:700;
    }
  }
}
</style>
