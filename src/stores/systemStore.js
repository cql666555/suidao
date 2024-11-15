import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
    state: () => {
        return {
            logoStore: true,
        };
    },
    // 本地持久化存储
    persist: {
        enabled: true,
        strategies: [
            {
                key: "system", // 自定义的key值 存储到本地时候的key
                storage: localStorage, // 选择存储方式
            },
        ],
    },
});
