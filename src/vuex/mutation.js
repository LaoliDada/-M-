export const mutations = {
    beloglogin(state){
        state.loading = true;
    },
    closelogin(state){
        state.loading = false;
    },
    clickTheNewAdd(state,option){
        state.serInpAdd = [];
        state.addressName = option.name;
        state.latitude = option.latitude;
        state.longitude = option.longitude;
        localStorage.setItem("addressName",option.name);
        localStorage.setItem("latitude",option.latitude);
        localStorage.setItem("longitude",option.longitude);
    }
}