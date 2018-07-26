/* const state = {
    msg: new Date().toString()
}

const mutations = {
    update: (state,{timestamp})=>{
        state.msg = timestamp;
    }
}

const actions = {
    update: ({commit},{timestamp})=>{
        setTimeout(()=>{
            commit({
                type:'update',
                timestamp
            })
        },1000);
    }
}

export default{
    state,
    mutations,
    actions
} */

const state = {
    msg:new Date().toString()
}

const mutations = {
    update:(state,{timestamp})=>{
        state.msg=timestamp;
    }
}

const actions = {
    update:({commit},{timestamp})=>{
        setTimeout(()=>{
            commit({
                type:'update',
                timestamp
            })
        },1000)
    }
}
export default{
    state,
    mutations,
    actions
}