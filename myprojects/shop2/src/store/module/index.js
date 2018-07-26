import {getList} from '../../api/index';

const state = {
    list:[],
    price:0,
    isSelectAll:false
}

const mutations = {
    updateList: (state,{list})=>{
        state.list = list;
    },
    selectItem: (state,{ind})=>{
        let list = state.list;
        list.forEach((item,index)=>{
            if(index == ind){
                item.checked = !item.checked;
            }
        })
        state.list = list;
    },
    changeNum: (state,{ind,type})=>{
        state.list.forEach((item,index)=>{
            if(index == ind){
                if(type == '+'){
                    item.count++;
                }else{
                    if(item.count == 0){
                        return;
                    }
                    item.count--;
                }
            }
        })
    },
    selectAll: (state,{checked})=>{
        state.isSelectAll = !state.isSelectAll;
        state.list.forEach(item =>{
            item.checked = state.isSelectAll;
        })
    },
    totalPrice: (state)=>{
        let price = 0;
        state.list.forEach(item=>{
            if(item.checked&&item.count>0){
                price+=item.pic*item.count;
            }
        })
        state.price = price
    }
}

const actions = {
    getProductList(context){
        getList().then(res=>{
            res.json().then(body=>{
                body.data.list.forEach(item=>{
                    item.checked = false;
                    item.count = 0;
                })
                context.commit('updateList',{list:body.data.list});
              context.commit('totalPrice'); 
            })
        })
    },
    selectItem(context,payload){
        context.commit('selectItem',payload);
        context.commit('totalPrice');
    },
    changeNum(context,payload){
        context.commit('changeNum',payload);
        context.commit('totalPrice');
    },
    selectAll(context,payload){
        context.commit('selectAll',payload);
        context.commit('totalPrice');
    }
}

export default {
    state,
    mutations,
    actions
}