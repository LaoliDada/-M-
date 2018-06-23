
<template>
  <div class="find-wrap">
    <hello-world title='发现'></hello-world>
    <div class="content">
        <section class="first-data-top">
            <div class="first-data-top-item" v-for="(item,ind) in firstDataTop" @click="titGoUrl(item.content_url)">
                <div class="tit-and-con">
                    <p class="color-first-tit" :style="{color:item.title_color}">{{item.title}}</p>
                    <p class="first-contact">{{item.subtitle}}</p>
                </div>
                <img :src="item.main_pic_hash | imgfilter">
            </div>
        </section>
        <section class="secone-data-bot">
            <div class="second-data">
                <p class="second-data-title"><span class="second-data-title-left">—</span>限时好礼<span class="second-data-title-right">—</span></p>
                <p class="second-data-mes">金币换豪礼</p>
            </div>
            <div class="discountWrap">
                <ul>
                    <li v-for="(item,ind) in secondDataMiddle" v-if="ind<=2" @click="titGoUrl(item.url)">
                        <span class="discount">{{item.corner_marker}}</span>
                        <img :src="item.image_hash | imgfilter">
                        <p class="discount-name">{{item.title}}</p>
                        <p class="discount-price">{{item.points_required}}金币<span class="del-price">{{item.original_price}}</span></p>
                    </li>
                </ul>
                <p @click="titGoUrl('https://home.m.duiba.com.cn/chome/index?from=login&spm=14695.1.1.1')" class="look-more">查看更多<span class="fa fa-angle-right"></span></p>
            </div>
        </section>
    </div>
    <footer>
        <router-link to="/homePage" class="footer-item">
            <span class="fa fa-codiepie"></span>
            <span>首页</span>
        </router-link>
        <router-link to="/discover" class="act">
            <span class="fa fa-bandcamp"></span>
            <span>发现</span>
        </router-link>
        <router-link to="">
            <span class="fa fa-file-text-o"></span>
            <span>订单</span>
        </router-link>
        <router-link to="">
            <span class="fa fa-user-o"></span>
            <span>我的</span>
        </router-link>
    </footer>
  </div>

</template>

<script>
import HelloWorld from "./HelloWorld.vue";
import {mapState,mapActions} from "vuex"
export default {
  name: "Find",
  data() {
    return {
    };
  },
  filters: {
    imgfilter(val) {
      return (
        "http://fuss10.elemecdn.com/" +
        val[0] +
        "/" +
        val[1] +
        val[2] +
        "/" +
        val.substring(3) +
        ".jpeg"
      );
    }
  },
  mounted() {
      if(this.firstDataTop.length==0){
        this.getFindFirst();
        this.getFindSecond();
      }
  },
  methods:{
    titGoUrl(url){
        window.location.href=url;
    },
    ...mapActions([
        "getFindFirst",
        "getFindSecond"
    ])
  },
  computed:{
      ...mapState([
          "firstDataTop",
          "secondDataMiddle"
      ])
  },
  components: {
    HelloWorld
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.discountWrap{
    .discount-name,
    .discount-price{
        font-size:1.1rem;
        margin-bottom:1rem;
    }
    .discount-price{
        color:#ff5339;
        .del-price{
            color:#aaa;
            font-size:.8rem;
            text-decoration: line-through;
            margin-left:4px;
        }
    }
    .look-more{
        width:100%;
        text-align: center;
        color:#999;
        padding-bottom:1.5rem;
        font-size:1.1rem;
        margin-top:1rem;
        .fa{
            margin-left:5px;
            vertical-align: top;
        }
    }
    ul{
        width:100%;
        box-sizing: border-box;
        display:flex;
        padding:1rem;
        justify-content: space-between;
        li{
            flex:1;
            display:flex;
            flex-direction: column;
            position:relative;
            .discount{
                position:absolute;
                background:#333;
                color:#fff;
                padding:.2rem;
                top:0px;
            }
            img{
                width:100%;

            }
        }
    }
}
.second-data-mes,
.second-data-title
{
    text-align: center;
    width:100%;
}
.second-data-mes{
    color:#999;
    font-size:.8rem;
    margin-top:3px;
}
.secone-data-bot{
    background:#fff;
    box-sizing: border-box;
    width:100%;
    .second-data-title{
    font-size:1.5rem;
    font-weight:600;
    color:#333;
    span{
        font-weight:normal;
        position:relative;
        &.second-data-title-left{
            padding-right:8px;
            &:after{
            content:""; 
            width:5px;
            height:5px;
            background:#333;
            border-radius:5px;
            display:inline-block;
            vertical-align:middle;
            margin-top:-2px;
            }
        }
          &.second-data-title-right{
            padding-left:6px;
            &:before{
            content:""; 
            display:inline-block;
            width:5px;
            height:5px;
            background:#333;
            border-radius:5px;
            vertical-align:middle;
            margin-top:-2px;
            }
        }
    }
}
.second-data{
    padding:1rem;
}
}

.first-data-top {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background:#fff;
  margin-bottom:1rem;
  .color-first-tit {
    font-size: 1.4rem;
  }
  .first-data-top-item {
    width: 50%;
    height: 7rem;
    box-sizing: border-box;
    margin-left: 50%;
    border-bottom: 1px solid #ededed;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tit-and-con{
        height:3rem;
    }
    img {
      width: 3.6rem;
      height: 3.6rem;
      margin-top: -5px;
    }
    &:nth-child(3n + 1) {
      border-right: 1px solid #ededed;
      margin-left: 0;
      top: 14rem;
      left: 0px;
      position: absolute;
    }
    &:first-child {
      height: 14rem;
      top: 0px;
      border-right: 1px solid #ededed;
      display:block;
      img{
          float:right;
          margin-top:2rem;
          width:7rem;
          height:7rem;
      }
    }
    .first-contact {
      font-size: 0.8rem;
      color: #999;
      margin-top: 0.5rem;
    }
  }
}
</style>
