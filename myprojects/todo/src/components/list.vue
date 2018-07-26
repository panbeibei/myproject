<template>
    <div>
        <p>
            <span @click="changeType('all')">全部</span>
            <span @click="changeType('finish')">已完成</span>
            <span @click="changeType('unfinish')">未完成</span>
        </p>
        <ul>
            <li @click="finish(item)" v-for="(item,index) in list" :style="item.finish?{textDecoration:'line-through'}:''" :key="index">{{item.msg}}</li>
        </ul>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default {
    computed:{
        ...mapState({
            list:state=>{
                if(state.index.type== 'all'){
                    return state.index.list;
                }else{
                    return state.index.list.filter(item=>{
                        return item.finish == (state.index.type == 'finish');
                    })
                }
            }
        })
    },
    methods:{
        ...mapMutations({
            changeType:'changeType',
            finish:'finish'
        })
    }
}
</script>

