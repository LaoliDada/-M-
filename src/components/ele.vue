<template>
  <div class="find-wrap">
    <div class="content">
        <div class="sel-address">
            <div class="sel-address-con" @click="gotoaddressSearch">
                <span class="fa fa-map-marker"></span>
                <span class="address-name">{{addressName}}</span>
                <span class="fa fa-sort-desc"></span>
            </div>
        </div>
        <div class="search-inp-wrap" @click="gotoHpSearch">
            <p><span class="fa fa-search"></span>搜索饿了么商家、商品名称</p>
        </div>
        <template v-if="hpHannerArr.length>0">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(item,ind) in hpHannerArr" :key="ind" :class="hpHannerArr&&hpHannerArr.length<=1?'swiper-no-swiping':''"><img class="hpBan" :src="item.image_hash | imgfilter2"></swiper-slide>
            </swiper>
        </template>
        <template v-if="hpHannerArr.length>0">
            <swiper :options="swiperOptionNav" ref="mySwiperNav">
                <!-- slides -->
                <swiper-slide v-for="(item,ind) in navArrThisCom" :key="item[0]['image_hash']" :class="['nav-wrap',navArrThisCom&&navArrThisCom.length<=1?'swiper-no-swiping':'']">
                    <nav class="home-page-nav-item" v-for="(val,index) in item" :key="index">
                        <img class="home-page-nav-item-img" :src="val.image_hash | imgfilter">
                        <span>{{val.name}}</span>
                    </nav>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </template>
        <div class="nav-bottmo-wrap">
            <section>
                <h3>品质套餐</h3>
                <p>搭配齐全吃得好</p>
                <p>立即抢购&gt;</p>
                <img src="//fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png">
            </section>
            <section>
                <h3 class="nav-bottom-last-tit">限量抢购</h3>
                <p>超值美味9.9元起</p>
                <p class="gotoA"><span class="manyPeopGot">5484人</span>正在抢&gt;</p>
                <img src="//fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png">
            </section>
        </div>
        <div class="tuijianShop">
            <p class="tuijianShop-title"><span>—</span>推荐商家<span>—</span></p>
            <ul>
               <li v-for="(item,ind) in recommendingBusiness.items">
                   <div class="tuijianShopItemTop">
                       <div class="tuijianShopItemTop-left">
                          <img :src="item.restaurant.image_path | imgfilter2">
                        </div>
                       <div class="tuijianShopItemTop-right">
                            <p class="tuijianShopItemTop-right-one">
                                <span v-if="item.is_premium"></span>
                            </p>
                       </div>
                   </div>
                   <div class="tuijianShopItemBottom">

                   </div>
                </li> 
            </ul>
        </div>
    </div>
    <footer>
        <router-link class="act" to="/homePage">
            <span class="fa fa-codiepie"></span>
            <span>首页</span>
        </router-link>
        <router-link to="/discover">
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

    <keep-alive>
        <transition name="slideLeft">
            <router-view></router-view>
        </transition>
    </keep-alive>
  </div>

</template>

<script>
import {mapState,mapActions} from "vuex";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: "Find",
  data() {
    return {
        offsetData:0
    };
  },
  created(){
        this.getHomePageBanner();
        this.getTuiJianShop({offset:this.offsetData});
        this.getThisAddress();
  },
  mounted(){
      
  },
  filters: {
    imgfilter(val) {
      return (
        "//fuss10.elemecdn.com/" +
        val[0] +
        "/" +
        val[1] +
        val[2] +
        "/" +
        val.substring(3) +
        ".jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/"
      );
    },
    imgfilter2(val) {
        let houzhui = val.match(/png|jpeg$/);
      return (
        "//fuss10.elemecdn.com/" +
        val[0] +
        "/" +
        val[1] +
        val[2] +
        "/" +
        val.substring(3) +
        "."+
        houzhui[0]
      );
    },
  },
  computed:{
      swiperOption(){
        let auto =this.hpHannerArr.length>1?{delay:2000}:false;
        return {
            autoplay:auto,
            loop:true
        }
      },
      swiperOptionNav(){
        return {
            loop:true,
            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: 'my-bullet-active',
            },
        }
      },
      navLoop(){
          return Math.ceil(this.hpNav.length/10);
      },
      navArrThisCom(){
          const theArr = [];
          if(this.hpNav.length>10){
            theArr.push(this.hpNav.filter(function(val,ind){
                return ind<=9;
            }))
            theArr.push(this.hpNav.filter(function(val,ind){
                return ind>9;
            }))
          }else if(this.hpNav.length<=10){
            theArr.push(this.hpNav);
          }
          return theArr
      },
      ...mapState({
          latitude:"latitude",
          longitude:"longitude",
          hpNav:"hpNav",
          addressName:"addressName",
          hpHannerArr (state) {
              return state.hpHannerArr;
          },
          recommendingBusiness:"recommendingBusiness"
      })
  },
  methods:{
      gotoaddressSearch(){
        this.$router.push({path:"/homePage/serAddress"});
      },
    titGoUrl(url){
        window.location.href=url;
    },
    ...mapActions([
        "getHomePageBanner",
        "getTuiJianShop",
        "getThisAddress"
    ]),
    gotoHpSearch(){
        this.$router.push({path:"/homePage/hpsearch"});
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.tuijianShop{
    width: 100%;
    li{
        padding:2rem .8rem;
        border-bottom:1px solid #f0f0f0;
        .tuijianShopItemTop{
            display:flex;
            .tuijianShopItemTop-right{
                flex:1;
                margin-left: .5rem;
            }
            .tuijianShopItemTop-left{
                width:18%;
                border:1px solid #f0f0f0;
                img{
                    width:100%;
                }
            }
        }
    }
    
}
.slideLeft-enter-active,
.slideLeft-leave-active{
    transition: all .3s;
}
.slideLeft-enter,.slideLeft-leave-to{
    transform:translate(100%);
}
.find-wrap{
    background:#fff;
}
.nav-bottmo-wrap{
    width:100%;
    padding:0 1rem;
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    section{
        margin-top: .5rem;
        width: 49%;
        background: linear-gradient(0deg,#f4f4f4 5%,#fafafa 95%);
        box-sizing:border-box;
        padding-left: 1rem;
        padding-top: 1rem;
        h3{
            font-size: 1.4rem;
            color:#000;
            font-weight:600;
            margin-bottom:.7rem;
            &.nav-bottom-last-tit{
                color:#e81919;
            }
        }
        p{
            font-size:1.1rem;
            &:nth-of-type(1){
                color:#777;
                margin-bottom:.7rem;
            }
            &:nth-of-type(2){
                font-size:1rem;
                color:#af8260;
                font-weight:600;
                .manyPeopGot{
                    color:#e81919;
                }
            }
            &.gotoA{
                color:#333;
            }
        }
        img{
            width:60%;
            float:right;
        }
    }
}
.nav-wrap{
    width:100%;
    display:flex;
    flex-wrap: wrap;
    padding-bottom:2rem;
    padding-top:1rem;
}
    .home-page-nav-item{
        display:flex;
        flex-direction:column;
        width:20%;
        align-items:center;
        img{
            width:60%;
            height:auto;
        }
    }
    .hpBan{
        width:100%;
        height:auto;
    }
    .sel-address{
        padding:1rem;
        padding-bottom:0;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        .sel-address-con{
            padding:.5rem 0;
            font-size:1.4rem;
            color:#fff;
            font-weight:bolder;
            .fa-map-marker{
                margin-right: 8px;
            }
            .fa{
                position:relative;
                top:-.3rem;
            }
        }
    }
    .search-inp-wrap{
        width:100%;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        padding:.5rem 1rem;
        box-sizing: border-box;
        p{
            width:100%;
            height:3rem;
            background:#fff;
            text-align: center;
            color:#999;
            font-size:1.4rem;
            line-height:3rem;
            font-weight:lighter;
            border-radius:2px;
            .fa{
                margin-right:.5rem;
                color:#ddd;
            }
        }
    }


.tuijianShop{
    box-sizing: border-box;
    .tuijianShop-title{
        text-align: center;
        font-size:1.32rem;
        padding-top:2rem;
        span{
            color:#999;
            &:first-child{
                margin-right:1rem;
            }
            &:last-child{
                margin-left:.8rem;
            }
        }
    }
}
.address-name{
    max-width: 40%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
}
</style>
<style>
.my-bullet-active{
    background:#000;
    opacity:1;
}
.swiper-pagination{
    bottom:0px;
}
.swiper-pagination-bullet{
    width:4px;
    height:4px;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom:2px;
}
</style>