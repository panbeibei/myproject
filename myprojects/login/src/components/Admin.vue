<template>
   <div>
        <div v-if="showList">
             <el-table :data="list.slice((this.currentPage-1)*10, this.currentPage*10)" style="width: 100%">
        <el-table-column width="120" label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.row.id, scope.row)">编辑角色</el-button>
        </template>

        </el-table-column> 
        <el-table-column
        label="id"
        width="80">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
        </el-table-column> 　
        <el-table-column
        label="姓名"
        width="120">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="出生日期"
        width="180">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            <p>出生日期: {{ scope.row.birthday }}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.birthday }}</el-tag>
            </div>
            </el-popover>
        </template>
        </el-table-column>
         <el-table-column
        label="电话"
        width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.phone }}</el-tag>
            </div>
        </template>
        </el-table-column>
         <el-table-column
        label="地址"
        width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.address }}</el-tag>
            </div>
        </template>
        </el-table-column>
    </el-table>    
            <el-pagination @current-change="changePage"
            layout="prev, pager, next"
            :total="list.length">
        </el-pagination>
    </div>
    <div v-else>
           <div>
               <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phone" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="地址">
                        <el-input v-model="form.address" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="出生日期">
                        <el-input v-model="form.birthday" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="已有权限">
                        <el-tag closable v-for="(item, index) in myRoler" :key="index"
                        @close="removeTag(item, index)">{{item.rolername}}</el-tag>
                    </el-form-item>
                    <el-form-item label="全部权限">
                        <span  v-for="(item, index) in allRoler" :key="index"
                        @click="addTag(item)">
                            <el-tag >{{item.rolername}}</el-tag>
                        </span>
                    </el-form-item>
               </el-form>
           </div>
             <el-row style="text-align:center">
                <el-button type="primary" @click="clickBtn">返回</el-button>
             </el-row>
       </div>
    </div>
    
</template>
    
<script>
  import axios from 'axios';
    export default {
      data() {
          return {
            list:[],
            showList:true,
            currentPage:1,
            form:{},
            userInfo:{},
            roleList:[],
            allRoler:[],
            myRoler:[]
          }
      },
      methods: {
        changePage(page) {
          this.currentPage = page;
        },
        handleEdit(id,row) {
          this.form = row;
          console.log(id);
          
          axios.get('http://localhost:9000/rolerList',{
            params:{
              id
            }
          })
          .then(res =>{
            if(res.data.code == 0){
              this.allRoler = res.data.allRoler;
              this.myRoler = res.data.myRoler;
              this.showList = false;
            }else{
              this.$alert(res.data.msg);
            }
          })
        },
        addTag(item){
          console.log(item.id)
          let index = this.myRoler.findIndex((value)=>{
            return value.rid == item.id
          })
          if(index!= -1){
            this.$alert('你已有当前角色');
            return;
          }

          axios.get(`http://localhost:9000/addRoler?uid=${this.form.id}&8888888888888rid=${item.id}`)
          .then(res=> {
            if(res.data.code == 0){
              this.myRoler.push({
                rid:item.id,
                rolername:item.rolername
              });
            }else{
              this.$alert(res.data.msg);
            }
          });
        },
        removeTag(item,index){
          axios.get(`http://localhost:9000/removeRoler?uid=${this.form.id}&rid=${item.rid}`)
          .then(res=>{
            if(res.data.code == 0){
              this.myRoler.splice(index,1);
            }else{
              this.$alert(res.data.msg);
            }
          });
        },
        clickBtn(){
          this.showList = true;
        }
      },
      mounted(){
        axios.get('http://127.0.0.1:9000/userList').then(res=>{
          if(res.data.code == 0){
            this.list = res.data.data;
          }else {
            this.$alert(res.data.msg);
          }
        })
      }
    }
</script>


