export const state = {
    firstDataTop: [],//发现页第一个渲染的广告
    secondDataMiddle: [],//发现页第二个渲染的广告,
    latitude:39.943419,
    longitude:116.330572,
    addressName:localStorage.getItem("addressName")?localStorage.getItem("addressName"):"请选择位置",
    hpHannerArr:[],
    loading:false,
    hpNav:[],
    recommendingBusiness:[],
    serInpAdd:[]
}