<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>一级类名设置</h3>
<el-form-item label="中文类名" prop="">
    <el-input type="text" v-model="ruleForm2.cnname_one" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="en">
    <el-input v-model.number="ruleForm2.enname_one"></el-input>
</el-form-item>
<h3>二级类名设置</h3>
<el-form-item label="中文类名" prop="">
    <el-input type="text" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="entwo">
    <el-input v-model.number="ruleForm2.enname_two"></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>
</el-form>

</template>

<script>
    export default {
        data() {

            var en = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    console.log(this.ruleForm2.enname_one)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_one)) {

                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }

                }
            };
            var entwo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    console.log(this.ruleForm2.enname_two)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_two)) {

                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }

                }
            };

            return {
                ruleForm2: {
                    cnname_one: "",
                    enname_one: "",
                    cnname_two: "",
                    enname_two: "",
                },
                rules2: {
                    nonull1: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    nonull2: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    en: [{
                        validator: en,
                        trigger: 'blur'
                    }],
                    entwo: [{
                        validator: entwo,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.axios.post("/api/back_class/add_class_one", this.ruleForm2).then(function(data) {
                            if (data.data.code == "1014") {
                                this.$message({
                                    message: data.data.msg,
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: data.data.msg,
                                    type: 'error'
                                });
                            }


                        }.bind(this))
                    } else {
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

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
</style>