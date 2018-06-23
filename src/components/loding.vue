<template>
  <div class="find-wrap">
    <img src="static/images/loading.gif">
  </div>

</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  name: "Find",
  data() {
    return {
        
    };
  },
  mounted(){
  },
  computed:{
     
  },
  methods:{
    
  },
  components: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    html{
    }
    .find-wrap{
        width: 100%;
        height:100%;
        background:#fff;
        img{
            width:2rem;
            height:2rem;
            position:absolute;
            top:50%;
            margin-left:-1rem;
            left:50%;
            margin-top:-1rem;
        }
    }
</style>
