<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree :load="loadNode" lazy style="max-width: 600px" :data="data" :props="defaultProps"
                @node-click="handleNodeClick" />
        </div>
        <div class="tunnel-content">
            <el-table :data="tunnelContent.data" style="width: 100%;">
                <el-table-column label="序号" prop="id"></el-table-column>
                <el-table-column label="隧道名称" prop="tunnelname"></el-table-column>
                <el-table-column label="图名" prop="imagename"></el-table-column>
                <el-table-column label="图号" prop="num"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger"
                            @click="preViewHandler(scope.$index, scope.row)">预览</el-button>
                        <!-- <el-upload v-model:file-list="fileList" action="http://localhost:3000/api/upload" :limit="1"
                            :on-exceed="handleExceed" class="upload"><el-button size="small" type="success"
                                @click="updateHandler(scope.$index, scope.row)">上传</el-button>
                        </el-upload> -->
                        <el-button size="small" type="success"
                            @click="updateHandler(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 上传对话框 -->
        <el-dialog destroy-on-close center v-model="dialogUpdateVisible" title="上传文件" width="500">
            <el-upload v-model:file-list="fileList" action="http://localhost:3000/api/upload" :limit="1"
                :on-exceed="handleExceed" class="upload" :on-success="handleAvatarSuccess">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogUpdateVisible = false">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import api from '@/api/index.js';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const currentID = ref(0)
const fileList = ref([])

const dialogUpdateVisible = ref(false)

const defaultProps = {
    children: 'children',
    label: 'name',
}

const tunnelContent = reactive({
    data: []
})

const handleNodeClick = (data) => {
    // console.log(data)
    api.getTunnelContent({ content: data.content }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
            tunnelContent.data = res.data.result;
        }
        else {
            tunnelContent.data = []
        }
    })
}

const loadNode = (node, resolve) => {
    // 一级节点
    if (node.level === 0) {
        api.getTunnelList().then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        })
    }
    // 二级节点
    if (node.level === 1) {
        api.getTunnelListChild({
            cid: node.data.cid
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        })
    }
    // 大于二级节点
    if (node.level > 1) {
        resolve([])
    }
}

/**
 * 预览
 */
const preViewHandler = (index, row) => {
    router.push('/pdf/' + row.id)
}

/**
 * 上传
 */
const updateHandler = (index, row) => {
    dialogUpdateVisible.value = true
    currentID.value = row.id
    // console.log(currentID)
}

/**
 * 上传文件超出
 */
const handleExceed = () => {
    console.log('上传文件超出')
}

/**
 * 上传成功
 */
const handleAvatarSuccess = (response, uploadFile) => {
    // console.log(response)
    api.getUploadTunnelContent({
        id: currentID.value,
        urlName: response.url.substr(7)
    }).then(res => {
        console.log(res.data)
    })
}

</script>

<style scoped>
.tunnel-container {
    display: flex
}

.tunnel-list {
    width: 250px;
    background-color: #fff;
    padding: 10px;
    margin-right: 20px;
}

.tunnel-list h3 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
}

.tunnel-content {
    flex: 1;
}

.upload {
    display: inline-block;
}
</style>