<template>
    <div class="setting">
        <!-- 控制抽屉按钮 -->
        <el-button size="large" type="primary" @click="drawer = true" class="setting-btn">
            <el-icon class="setting-icon">
                <Setting />
            </el-icon>
        </el-button>
        <!-- 抽屉 -->
        <el-drawer v-model="drawer" title="系统设置" size="20%">
            <el-icon>
                <Lock />
            </el-icon>
            <span class="logo-show">Logo显示与隐藏</span>
            <el-switch v-model="systemStore.logoStore"></el-switch>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSystemStore } from '@/stores/systemStore.js'
const systemStore = useSystemStore();

const emit = defineEmits(['onToggleEvent'])


const drawer = ref(false)
// const logoToggle = ref(false)

// watch(logoToggle, (newValue, oldValue) => {
//     emit('onToggleEvent', newValue)
// })

</script>

<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 100;
}

.setting-icon {
    font-size: 25px;
}

.logo-show {
    margin-right: 20px;
    margin-left: 10px;
}
</style>