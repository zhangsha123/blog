<template>
  <div class="body">
    <el-table
    :data="alldata"
    style="width: 100%"
    :row-class-name="tableRowClassName" @row-dblclick.self="clickfn" :show-header="false">
<el-table-column type="expand">
      <template scope="props">
          <el-table
    :data="props.row.twodata"
    style="width: 100%"
    :row-class-name="tableRowClassName" @row-dblclick.self="clickfn" :show-header="false">
        <el-table-column prop="cnname" label="二级类名" width="160">
</el-table-column>
<el-table-column prop="enname" label="二级标识" width="160">
</el-table-column>
<el-table-column label="操作" width="200">
    <template scope="scope">
        <el-button
          size="small"
          @click="handleEditTwo(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'two',props.row.onedata)">删除</el-button>
</template>

</el-table-column>
</el-table>
</template>
</el-table-column>
<el-table-column prop="onedata.cnname" label="一级类名" width="180">

</el-table-column>
<el-table-column prop="onedata.enname" label="一级标识" width="180">
</el-table-column>
<el-table-column label="操作" width="200">
    <template scope="scope">
        <el-button
          size="small"
          @click="handleEditOne(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
</template>

</el-table-column>
</el-table>

<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
    <span>确定删除此类名</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFn">确 定</el-button>
  </span>
</el-dialog>

</div>

</template>

<style>
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
    
    .demo-table-expand {
        font-size: 0;
    }
    
    .demo-table-expand label {
        width: 90px;
        color: red;
    }
    
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    
    .el-table__expanded-cell {
        padding: 20px 43px;
        background-color: #fbfdff;
        box-shadow: inset 0 2px 0 #f4f4f4;
    }
</style>

<script>
    export default {
        methods: {
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            fn() {
                alert(22)
            },
            // 跳转详情
            clickfn(row, event, column) {
                this.$router.push({
                    name: "api_detail",
                    params: row
                })
            },
            // 修改
            handleEditOne(index, rows) {
                console.log(rows)
                this.$router.push({
                    name: "amend_class",
                    params: {
                        data: rows,
                        type: "one"
                    }
                })
            }, // 修改
            handleEditTwo(index, rows) {
                console.log(rows)
                this.$router.push({
                    name: "amend_class",
                    params: {
                        data: rows,
                        type: "two"
                    }
                })
            },
            // 点击触发弹窗
            handleDelete(index, rows, type, onedata) {

                this.dialogVisible = true

                if (type == "one") {
                    this.sendData = {
                        id: rows.onedata.id, //一级类名的id
                        enname_one: rows.onedata.enname //一级类名的英文标识
                    }
                    console.log(this.sendData)
                    this.deleteUrl = "/api/back_class/delete_one"
                } else {

                    this.sendData = {
                        oneId: rows.parent_id, //一级分类id
                        twoId: rows.id, //二级分类id
                        enname_one: onedata.enname //一级分类英文标识
                    }
                    this.deleteUrl = "/api/back_class/delete_two"
                }

            },
            // 确定后调用删除接口
            deleteFn() {
                this.axios.post(this.deleteUrl, this.sendData).then(function(data) {
                    console.log(data.data)
                    if (data.data.code == "1071") {
                        this.dialogVisible = false
                        this.open2()
                        this.$router.go(0)
                    } else {
                        this.dialogVisible = false
                        this.open4()
                    }
                    console.log(this.alldata)
                }.bind(this))
            },
            // 成功消息提示
            open2() {
                this.$message({
                    message: '恭喜你，删除消息成功',
                    type: 'success'
                });
            },
            // 失败消息提示
            open4() {
                this.$message.error('不好意思，删除失败');
            }
        },
        data() {
            return {
                deleteUrl: "",
                sendData: {}, //删除时使用的数据
                dialogVisible: false, //删除弹窗的控制
                currentPage4: 0, //当前显示页
                alldata: [], //请求的元数据
                everypagelist: 5, //默认每页显示条数
                everypage: [] //每页的数据
            }
        },
        mounted() {

            this.axios.get("/api/back_class/class_list").then(function(data) {
                if (data.data.code == "1043") {
                    this.alldata = data.data.data
                    this.$message({
                        message: data.data.msg,
                        type: "success"
                    })
                } else {
                    this.$message({
                        message: data.data.msg,
                        type: "error"
                    })
                }


            }.bind(this))
        }
    }
</script>
<style scoped>
    .body {
        margin: 20px 0;
    }
    
    .block {
        margin: 40px auto;
    }
    
    .block div {
        text-align: center
    }
</style>