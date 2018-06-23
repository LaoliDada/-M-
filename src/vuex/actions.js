import axios from "axios"
export const actions = {
    getFindFirst({state}){
        state.loading=true;
        axios.get("api/v1/discover?platform=1&block_index=0").then(function(res){
            state.loading=false;
            state.firstDataTop = res.data[1];
        })
    },
    getFindSecond({state}){
        state.loading=true;
        axios.get("api/gifts/suggest").then(function(res){
            state.loading=false;
            state.secondDataMiddle = res.data;
        })
    },
    getHomePageBanner({state}){
        state.loading=true;
        const getBanner = ()=>axios.get(`resetapi/shopping/v2/entries?latitude=${state.latitude}&longitude=${state.longitude}&templates%5B%5D=big_sale_promotion_template`);
        const getNav = ()=>axios.get(`resetapi/shopping/openapi/entries?latitude=${state.latitude}&longitude=${state.longitude}&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template`)
        axios.all([getBanner(),getNav()]).then(axios.spread(
            function(acct,perms){
                state.loading=false;
                    state.hpHannerArr = acct.data[0]["entries"];
                    state.hpNav = perms.data[0]["entries"];
            }
        ))
    },
    getTuiJianShop({state},commit){
        axios.get(`resetapi/shopping/v3/restaurants?latitude=${state.latitude}&longitude=${state.longitude}&offset=${commit.offset}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5`).then(function(res){
            state.recommendingBusiness = res.data;
        })
    },
    getAddressName({state}){
        if(!state.addressName||(state.addressName!=localStorage.getItem("addressName"))){
            axios.get(`resetapi/bgs/poi/reverse_geo_coding?latitude=${localStorage.getItem("latitude")}&longitude=${localStorage.getItem("longitude")}`).then(function(res){
                state.addressName=res.data.name;
                localStorage.setItem("addressName",state.addressName);
           })
        }
       
    },
    serInpAddAct({state},add){
        if(add){
            axios.get(`resetapi/bgs/poi/search_poi_nearby_alipay?keyword=${add}&offset=0&limit=20&latitude=${localStorage.getItem("latitude")}&longitude=${localStorage.getItem("longitude")}`).then(function(res){
                state.serInpAdd = res.data;
           })
        }else{
            state.serInpAdd=[];
        }
        
    },
    getThisAddress({state,dispatch}){
            var map = new AMap.Map('container');
            map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,     
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
    
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)
    
            function onComplete (data) {
                // data是具体的定位信息
                // state.latitude = data.
                state.latitude = data.position.lat;
                state.longitude = data.position.lng;
                localStorage.setItem("latitude",state.latitude);
                localStorage.setItem("longitude",state.longitude);
                dispatch("getAddressName");
            }
    
            function onError (data) {
                // 定位出错
            }
            })
    }
}