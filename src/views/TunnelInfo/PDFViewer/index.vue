<template>
    <div>
        <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import api from '@/api';

const route = useRoute()
// console.log(route.params.id)

const pdfUrl = ref('')

onMounted(() => {
    api.getPdfPreView({
        id: route.params.id
    }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
            pdfUrl.value = "http://localhost:3000/" + res.data.result.urlName
        }
    })
})


</script>

<style scoped></style>