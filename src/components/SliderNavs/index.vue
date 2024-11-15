<template>
    <div class="slider-navs" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
        <div v-show="systemStore.logoStore" class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
        <el-menu background-color="#304156" text-color="#fff" active-text-color="#ffd04b" :default-active="active"
            router class="el-menu-vertical-demo" :collapse="menuStore.isCollapse">


            <template v-for="(item, index) in menuStore.menus">
                <el-sub-menu v-if="item.children" :key="index">
                    <template #title>
                        <component class="icon" :is="item.icon"></component>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="(childItem, childIndex) in item.children"
                        :key="childIndex">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="item.path" :key="item.path + index">
                    <component class="icon" :is="item.icon"></component>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>


        </el-menu>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMenuStore } from '@/stores/menuStore.js'
import { useSystemStore } from '@/stores/systemStore.js'
const systemStore = useSystemStore();

const active = ref('/')
const menuStore = useMenuStore();
const props = defineProps({
    myToggle: {
        type: Boolean,
        default: false
    }
})

/**
 * 修复刷新页面的高亮设置
 */
if (localStorage.getItem('active')) {
    active.value = localStorage.getItem('active')
}
</script>

<style scoped>
.slider-navs {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #304156;
    transition: 0.3s ease-in;
}

.logo {
    width: 100%;
    height: 60px;
    background-color: #364e6d;
    text-align: center;
    font-size: 25px;
    color: #fff;
    line-height: 60px;
}

.icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
</style>