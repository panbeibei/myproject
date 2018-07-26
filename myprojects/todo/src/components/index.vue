<template>
    <div>
        <input type="text" :value="val" @input="inputChange">
        <button @click="save(val)">保存</button>
        <List/>
    </div>
</template>
<script>
import List from './list'
import {mapState,mapMutations} from 'vuex';

export default {
    components:{
        List
    },
    computed:{
        ...mapState({
            val:state=>state.index.val
        })
    },
    methods:{
        inputChange(e){
            this.$store.commit('changeVal',e.target.value)
        },
        ...mapMutations({
            save:'addList'
        })
    }
}
</script>

