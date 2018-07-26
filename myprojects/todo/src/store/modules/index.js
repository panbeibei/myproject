const state = {
    val:'',
    type:'all',
    list:[{
        msg:'1111',
        finish:false
    },{
        msg:'2222',
        finish:false
    },{
        msg:'3333',
        finish:true
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
    changeType:(state,payload)=>{
        state.type = payload;
    },
    finish:(state,payload)=>{
        state.list.forEach(item=>{
            if(item==payload){
                item.finish=!item.finish;
            }
        })
    }
}

export default{
    state,
    mutations
}