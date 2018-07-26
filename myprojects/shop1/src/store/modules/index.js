const state = {
    val:'',
    type:'all',
    list:[{
        msg:'1111',
        finish:false
    },{
        msg:'2222',
        finish:true
    },{
        msg:'3333',
        finish:false
    }]
}

const mutations ={
    changeVal:(state,payload)=>{
        state.val = payload;
    },
    addList:(state,payload)=>{
        state.list.push({
            msg:payload,
            finish:false
        })
    },
    finish:(state,payload)=>{
        state.list.forEach(item=>{
            if(item == payload){
                item.finish = !item.finish
            }
        })
    },
    changeType:(state,payload)=>{
        state.type = payload;
    }
}
export default {
    state,
    mutations
}