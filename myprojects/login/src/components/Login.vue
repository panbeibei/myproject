<template>
   <div class="login-box">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="pass">
          <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {hex_md5} from '../utils/md5.js';
import axios from 'axios';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
     methods: {
      submitForm(formName) {//提交按钮
        this.$refs[formName].validate((valid) => {
          if (valid) {//当验证通过
          let data={};
          data.username=this.ruleForm2.pass;//用户名
          data.password=hex_md5(this.ruleForm2.checkPass);//密码加密
          //axios发送的是json数据
            axios.post('http://127.0.0.1:9000/login',data).then(res=>{
                if(res.data.code==1){
                  alert(res.data.msg)
                }else{
                  this.$router.push("/");
                }
            })
          } else {
            alert("您输入的用户名或密码错误")
            return false;
          }
        });
      }
    }

  }
</script>

