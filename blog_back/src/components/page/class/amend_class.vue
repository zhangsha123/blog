<template>
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>{{typeData.label}}</h3>
<el-form-item label="中文类名" prop="">
    <el-input type="text" v-model="ruleForm.cnname_one" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="en">
    <el-input v-model.number="ruleForm.enname_one"></el-input>
</el-form-item>

<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
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

                    if (/^[A-Za-z]+$/.test(this.ruleForm.enname_one)) {

                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }

                }
            };

            return {
                typeData: {
                    label: "",
                    url: ""
                },
                ruleForm: {
                    enname_one: "",
                    cnname_one: ""
                },
                sendForm: {
                    oldenname_one: ""
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

                }
            };
        },
        created() {
            console.log(this.$route)

            if (this.$route.params.type == "one") {
                this.typeData.label = "一级分类修改"
                this.typeData.url = "/api/back_class/amend_class_one"
                this.ruleForm.enname_one = this.$route.params.data.onedata.enname
                this.ruleForm.cnname_one = this.$route.params.data.onedata.cnname
                this.sendForm.oldenname_one = this.$route.params.data.onedata.enname
            } else {
                this.typeData.label = "二级分类修改"
                this.typeData.url = "/api/back_class/amend_class_two"
                this.ruleForm.enname_one = this.$route.params.data.enname
                this.ruleForm.cnname_one = this.$route.params.data.cnname
                this.sendForm.oldenname_two = this.$route.params.data.enname
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        var sendData = {}
                        if (this.$route.params.type == "one") {
                            sendData = this.ruleForm
                        } else {
                            sendData.enname_two = this.ruleForm.enname_one
                            sendData.cnname_two = this.ruleForm.cnname_one
                        }
                        Object.assign(this.sendForm, sendData)
                        this.axios.post(this.typeData.url, this.sendForm).then(function(data) {

                            if (data.data.code == "1052" || data.data.code == "1062") {
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