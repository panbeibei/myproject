<template>
    <el-container>
        <el-header>
            <h1>1601N班管理系统</h1>
        </el-header>
        <el-container>
            <el-aside>
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-deit">
                                <span slot="title" @click="clickCard">成绩单管理</span>
                            </i>
                        </template>
                        <el-menu-item index="1-1">
                            查看成绩单
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            修改成绩单
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu">
                                <span slot="title">
                                    综合积分管理
                                </span>
                            </i>
                        </template>
                        <el-menu-item index="2-1">
                            点名
                        </el-menu-item>
                        <el-menu-item index="2-2">查看综合积分</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">管理员</span>
                        </template>
                        <el-menu-item index="3-1">删除学生</el-menu-item>
                        <el-menu-item index="3-2" @click="clickBtn">分配权限</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickBtn(){
        this.$router.push('/content/admin')
    },
    clickCard(){
        this.$router.push('/content/grade')
    }
  }
};
</script>