import axios from "../utils/request";
import base from "./base";

const api = {
    /**
     * 登录
     */
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params);
    },
    /**
     * 用户权限
     */
    getRouter(params) {
        return axios.get(base.baseUrl + base.router, { params });
    },
    /**
     * 获取Line图表
     */
    getLine() {
        return axios.get(base.baseUrl + base.line);
    },
    /**
     * 读取隧道信息
     */
    projectInfo(params) {
        return axios.get(base.baseUrl + base.projectInfo, { params });
    },
    /**
     * 模糊查询
     */
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, { params });
    },
    /**
     * 获取数据总条数
     */
    getTotal() {
        return axios.get(base.baseUrl + base.total);
    },
    /**
     * 添加隧道
     */
    getAddProject(params) {
        return axios.get(base.baseUrl + base.addProject, { params });
    },
    /**
     * 删除隧道
     */
    getDelProject(params) {
        return axios.get(base.baseUrl + base.delProject, { params });
    },
    /**
     * 隧道预更新
     */
    getPreProejct(params) {
        return axios.get(base.baseUrl + base.preProject, { params });
    },
    /**
     * 隧道更新
     */
    getUpdateProject(id, params) {
        return axios.put(base.baseUrl + base.updateProject + id, params);
    },
    /**
     * 隧道设计信息 tree 一级
     */
    getTunnelList() {
        return axios.get(base.baseUrl + base.tunnelList);
    },
    /**
     * 隧道设计信息 tree 二级
     */
    getTunnelListChild(params) {
        return axios.get(base.baseUrl + base.tunnelListChild, { params });
    },
    /**
     * 隧道设计信息-content
     */
    getTunnelContent(params) {
        return axios.get(base.baseUrl + base.tunnelContent, { params });
    },
    /**
     * 隧道设计信息-content-上传
     */
    getUploadTunnelContent(params) {
        return axios.get(base.baseUrl + base.uploadTunnelContent, { params });
    },
    /**
     * pdf预览
     */
    getPdfPreView(params) {
        return axios.get(base.baseUrl + base.pdfPreView, { params });
    },
    /**
     * 获取用户列表
     */
    getUserList() {
        return axios.get(base.baseUrl + base.userList);
    },
    /**
     * 搜索用户
     */
    getSearchUser(params) {
        return axios.get(base.baseUrl + base.searchUser, { params });
    },
    /**
     * 用户添加
     */
    getAddUser(params) {
        return axios.get(base.baseUrl + base.addUser, { params });
    },
    /**
     * 用户删除
     */
    getDelUser(params) {
        return axios.get(base.baseUrl + base.delUser, { params });
    },
    /**
     * 用户预更新
     */
    getPreViewUser(params) {
        return axios.get(base.baseUrl + base.preViewUser, { params });
    },
    /**
     * 用户修改
     */
    getUpdateUser(params) {
        return axios.get(base.baseUrl + base.updateUser, { params });
    },
};

export default api;
