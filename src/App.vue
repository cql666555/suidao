<template>
  <router-view />
</template>

<script setup>

</script>

<style>
/*
  公共样式
 */

html,
body,
#app {
  height: 100%;
}

/* 去掉element menu 的右侧边框*/
.el-menu {
  border-right: 0 !important;
}

/**
  * 修改dialog的header样式
 */
/* .el-dialog__header {
  background-color: #304156;
  margin: 0;
}

.el-dialog__header span {
  color: #fff;
} */

/**
  * tree选中样式修改
  */
.is-current .el-tree-node__content {
  background-color: #337ecc !important;
  color: #fff;
}
</style>