<template>
    <div>
        <li v-for="(item,index) in list" :key="index">
            <input type="checkbox" :checked="item.checked" @change="selectItem({ind:index})">
            <img :src="item.img" alt="">
            <div>
                <p>{{item.tit}}</p>
                <p>{{item.zhong}}</p>
                <p>￥{{item.pic}}</p>
                <div>
                    <span @click="changeNum({ind:index,type:'+'})">+</span>
                    <span>{{item.count}}</span>
                    <span @click="changeNum({ind:index,type:'-'})">-</span>
                </div>
            </div>
        </li>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    computed:{
        ...mapState({
            list: state=>state.index.list
        })
    },
    methods:{
        ...mapActions({
            selectItem:'selectItem',
            changeNum:'changeNum'
        })
    },
    mounted(){
        this.$store.dispatch('getProductList')   
    }
}
</script>

<style>
li{
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
img{
    width:30%;
    height:100px;
}
</style>
