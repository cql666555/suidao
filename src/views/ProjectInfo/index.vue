<template>
    <div>
        <!-- 搜索与添加  start-->
        <div class="search">
            <span>项目状态：</span>
            <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" size="large"
                placeholder="请输入要搜索的信息"></el-input>
            <el-button @click="searchHandler" class="button" size="large" type="primary" plain>搜索</el-button>
            <el-button @click="addHandler" class="button" size="large" type="primary" plain>添加</el-button>
        </div>
        <!-- 搜索与添加  end-->
        <!-- 表格展示数据 -->
        <el-table :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
            <el-table-column prop="name" label="项目名称" width="180" />
            <el-table-column prop="number" label="项目编码" width="120" />
            <el-table-column prop="money" label="项目金额" width="120" />
            <el-table-column prop="address" label="项目地址" width="150" />
            <el-table-column prop="duration" label="项目工期(月)" width="120" />
            <el-table-column :formatter="value => dateFormater(Number(value.startTime))" prop="startTime" label="开工时间"
                width="150" />
            <el-table-column :formatter="value => dateFormater(Number(value.endTime))" prop="endTime" label="终止时间"
                width="150" />
            <el-table-column prop="quantity" label="隧道数量" width="120" />
            <el-table-column prop="status" label="项目状态" width="120">
                <template #default="scope">
                    <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status)
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注">
                <template #default="scope">
                    <div v-html="scope.row.remark"></div>
                </template>
            </el-table-column>

            <el-table-column width="150" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination @current-change="currentChangeHandler" background layout="prev, pager, next,jumper"
                :total="total" :default-page-size="defaultPageSize" />
        </div>

        <!-- 添加对话框 -->
        <el-dialog v-model="dialogAddVisible" title="添加隧道信息" width="40%" center>
            <el-form :inline="true" :model="addFormInfo">
                <el-form-item label="项目名称">
                    <el-input v-model="addFormInfo.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目编码">
                    <el-input v-model="addFormInfo.number" placeholder="请输入项目编码"></el-input>
                </el-form-item>
                <el-form-item label="项目金额">
                    <el-input v-model="addFormInfo.money" placeholder="请输入项目金额"></el-input>
                </el-form-item>
                <el-form-item label="项目地址">
                    <el-input v-model="addFormInfo.address" placeholder="请输入项目地址"></el-input>
                </el-form-item>
                <el-form-item label="项目工期">
                    <el-input v-model="addFormInfo.duration" placeholder="请输入项目工期"></el-input>
                </el-form-item>
                <el-form-item label="开工时间">
                    <!-- <el-input v-model="addFormInfo.startTime" placeholder="请输入开工时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="addFormInfo.startTime" type="date"
                        placeholder="请输入开工时间" />
                </el-form-item>
                <el-form-item label="终止时间">
                    <!-- <el-input v-model="addFormInfo.endTime" placeholder="请输入终止时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="addFormInfo.endTime" type="date" placeholder="请输入终止时间" />
                </el-form-item>
                <el-form-item label="隧道数量">
                    <el-input v-model="addFormInfo.quantity" placeholder="请输入隧道数量"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-input v-model="addFormInfo.status" placeholder="'1' 施工中 - '0' 已完工"></el-input>
                </el-form-item>
                <el-form-item label="项目备注">
                    <!-- <el-input v-model="addFormInfo.remark" placeholder="请输入项目备注"></el-input> -->
                    <TinymceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureHandler">确定</el-button>
                </div>
            </template>

        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog destroy-on-close v-model="dialogEditorVisible" title="编辑隧道信息" width="40%" center>

            <el-form :inline="true" :model="editorFormInfo">
                <el-form-item label="项目名称">
                    <el-input v-model="editorFormInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="项目编码">
                    <el-input v-model="editorFormInfo.number"></el-input>
                </el-form-item>
                <el-form-item label="项目金额">
                    <el-input v-model="editorFormInfo.money"></el-input>
                </el-form-item>
                <el-form-item label="项目地址">
                    <el-input v-model="editorFormInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="项目工期">
                    <el-input v-model="editorFormInfo.duration"></el-input>
                </el-form-item>
                <el-form-item label="开工时间">
                    <!-- <el-input v-model="editorFormInfo.startTime" placeholder="请输入开工时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="editorFormInfo.startTime" type="date" />
                </el-form-item>
                <el-form-item label="终止时间">
                    <!-- <el-input v-model="editorFormInfo.endTime" placeholder="请输入终止时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="editorFormInfo.endTime" type="date" />
                </el-form-item>
                <el-form-item label="隧道数量">
                    <el-input v-model="editorFormInfo.quantity"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-input v-model="editorFormInfo.status"></el-input>
                </el-form-item>
                <el-form-item label="项目备注">
                    <!-- <el-input v-model="editorFormInfo.remark"></el-input> -->
                    <TinymceEditor :editorID="editorID" :options="options" @onDataEvent="updateEditorHandler" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogEditorVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureEditorHandler">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import api from '@/api/index.js'
import { onMounted, reactive, readonly, ref } from 'vue'
import { dateFormater } from '@/utils/utils.js'
import TinymceEditor from "@/components/TinymceEditor/index.vue"
import { ElMessage } from 'element-plus';

const projectInfo = reactive({
    list: []
})

// 定义修改数据的唯一id
const editorID = ref(0)

// 添加对话框控制器
const dialogAddVisible = ref(false)

// 编辑对话框控制器
const dialogEditorVisible = ref(false)

// 初始化添加对话框状态
const addFormInfo = reactive({
    nane: '',
    number: '',
    money: '',
    address: '',
    duration: '',
    startTime: '',
    endTime: '',
    quantity: '',
    status: '',
    remark: ''
})

// 初始化编辑对话框状态
const editorFormInfo = reactive({
    nane: '',
    number: '',
    money: '',
    address: '',
    duration: '',
    startTime: '',
    endTime: '',
    quantity: '',
    status: '',
    remark: ''
})

// 初始化页数
const defaultPageSize = ref(15)

// 初始化总条数
const total = ref(0)

// 初始获取页面数据
onMounted(() => {
    http(1)
})


// 初始获取总条数
onMounted(() => {
    api.getTotal().then(res => {
        if (res.data.status === 200) {
            total.value = res.data.result[0]['count(*)']
        } else {
            total.value = 0
        }

    })

})


// 搜索初始化状态
const searchInfo = ref('')


/**
 * 网络请求
 */
const http = (page) => {
    api.projectInfo({ page }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
    })
}

/**
 * 隧道状态文本
 */
const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完工'
}


/**
 * 设置表格头部样式
 */
const headerClass = () => {
    return {
        background: '#dcdcdc',
        color: '#999',
        fontWeight: 700
    }
}

/**
 * 表格编辑按钮
 */
const handleEdit = (index, row) => {
    dialogEditorVisible.value = true
    editorID.value = row.id;
    // console.log(index, row)
    api.getPreProejct({ id: row.id }).then(res => {
        console.log(res.data)
        if (res.data.status === 200) {
            Object.assign(editorFormInfo, res.data.result, {
                startTime: Number(res.data.result.startTime),
                endTime: Number(res.data.result.endTime)
            })
        }
        else {
            ElMessage.error(res.data.msg)
        }
    })
}
/**
 * 表格删除按钮
 */
const handleDelete = (index, row) => {

    ElMessageBox.confirm(
        '确定要删除数据吗？',
        '删除数据',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {

            // 确定删除
            api.getDelProject({ id: row.id }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                    })
                    // 刷新UI
                    http(1)
                }
                else {
                    ElMessage({
                        type: 'error',
                        message: res.data.msg,
                    })
                }

            })


        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })


}

/**
 * 搜索按钮
 */
const searchHandler = () => {
    // console.log(searchInfo.value)
    api.getSearch({ search: searchInfo.value }).then(res => {
        // console.log(res.data);
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
        else {
            projectInfo.list = []
        }
    })
}

/**
 * 分页事件
 */
const currentChangeHandler = (val) => {
    // console.log(val)
    http(val)
}

// 添加对话框弹出事件
const addHandler = () => {
    dialogAddVisible.value = true
}

/**
 *  添加对话框确定事件
 */
const sureHandler = () => {
    // console.log(addFormInfo)
    api.getAddProject({
        ...addFormInfo
    }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
            dialogAddVisible.value = false;
            // 刷新页面
            http(1);
        }
        else {
            ElMessage.error(res.data.msg);
        }
    })
}
/**
 * 确认修改事件
 */
const sureEditorHandler = () => {
    api.getUpdateProject(editorID.value, {
        ...editorFormInfo
    }).then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
            dialogEditorVisible.value = false;
            http(1);
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

/**
 * 设置富文本编辑器的宽高
 */
const options = {
    width: '100%',
    height: '200px'
}

/**
 * 富文本编辑器获取数据事件
 */
const getInfoEditorHandler = (data) => {
    // console.log(data)
    addFormInfo.remark = data
}

/**
 * 修改提交富文本编辑器数据
 */
const updateEditorHandler = (data) => {
    editorFormInfo.remark = data
}
</script>

<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
}

.page {
    position: fixed;
    right: 10px;
    bottom: 0;
}
</style>