<template>
  <div class="login">
    <div class="mark" style="display:none">
      <img src="static/img/loading (5).gif" alt="">
    </div>
    <div class="login_box">
        <div class="top">
          <p>请登录：<b>Z.S.-BLOG</b></p>
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
     </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'login',
  data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          // if (this.ruleForm2.name!== '') {
          //   this.$refs.ruleForm2.validateField('name');
          // }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          name:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm2.name,this.ruleForm2.pass)
            this.axios.post('/api/back_class',{
                loginname:this.ruleForm2.name,
                loginpw:this.ruleForm2.pass
            }).then(function(data){
              console.log(data.data);
              if(data.data.code=="1001"){
                //alert(data.data.msg)
                $('.login_box').hide();
                $('.mark').show();
                setTimeout(function(){
                    _this.$router.push('/main');
                },2000)
                sessionStorage.setItem('id',data.data.userid)
                sessionStorage.setItem('name',_this.ruleForm2.name)
              }else if(data.data.code=="1002"){
                alert(data.data.msg)
              }else{
                alert(data.data.msg)
              }
            });
          }else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
   
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @keyframes scale{
     0%{
         transform: scale(1);
         color:#fff;
     }
     100%{
         transform: scale(1.1);
         color:burlywood;
     }
   }
   .login{
     display: flex;
     flex-direction: column;
     width:100%;
     height:100%;
     background: url("../../static/img/background.jpg") no-repeat;
     background-size: cover;
     font-size:18px;
     position: relative
   }
   .mark{
     position: absolute;
     width:100%;
     height:100%;
     background: rgba(0,0,0,0.7);
     text-align: center;
   }
   .mark img{
     margin-top:200px;
   }
   .login_box{
     width:350px;
     height:350px;
     background: rgba(0,0,0,0.6);
     border-radius: 10px; 
     color:#fff;
     /*border:2px solid rgb(210, 224, 224,0.2);*/
     padding:20px;
     margin:70px auto;
   }
   .demo-ruleForm{
      margin-top:20px;
      margin-left:-30px;
   }
   .top p{
     width:100%;
     text-align: center;
     animation: scale 3s ease infinite;
   }
</style>
