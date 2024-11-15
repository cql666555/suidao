<template>
    <div class="layout-container">
        <DrawerSettings @onToggleEvent="getToggleEvent" />
        <slider-navs :myToggle="myToggle" />
        <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }">
            <top-navs />
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>

</template>

<script setup>
import SliderNavs from '@/components/SliderNavs/index.vue'
import TopNavs from '@/components/TopNavs/index.vue'

import { useLoginStore } from '@/stores/loginStore.js'
import { useMenuStore } from '@/stores/menuStore.js'
import { onMounted, ref } from 'vue';
import api from '@/api/index.js'
import { useRouter } from 'vue-router'
import manageRouter from '@/router/dynamicRouter.js'
import DrawerSettings from '@/components/DrawerSettings/index.vue'

const loginStore = useLoginStore();
const menuStore = useMenuStore();
const router = useRouter();

const myToggle = ref(false)

/**
 * 用户权限的数据获取
 */
onMounted(() => {
    api.getRouter({
        user: loginStore.permission,
    }).then(res => {
        if (res.data.status === 200) {
            menuStore.menus = res.data.menuData.menus;
            // 判断用户当前权限
            if (loginStore.permission === 'admin') {
                router.addRoute('layout', manageRouter)
            }
        }
    }).catch(err => {
        console.log(err);
    })
})

const getToggleEvent = (data) => {
    myToggle.value = data
}


</script>

<style scoped>
.right-container {
    margin-left: 210px;
    transition: 0.3s ease-in;
}

.content {
    padding: 10px;
}
</style>