/**
 * 存放所有网络请求地址
 */
const base = {
    baseUrl: "http://localhost:3000", // 公共地址
    login: "/api/login", // 登录地址
    router: "/api/router", // 用户权限地址
    line: "/api/line", // 图表 Line
    projectInfo: "/api/project/all", // 隧道信息获取
    search: "/api/project/search", // 搜索地址
    total: "/api/project/total", //总条数
    addProject: "/api/project/add", // 添加隧道
    delProject: "/api/project/del", // 删除隧道
    preProject: "/api/project/update/pre", // 隧道预更新
    updateProject: "/api/project/update/", // 隧道更新
    tunnelList: "/api/tunnel/list", // 隧道设计信息-tree-一级
    tunnelListChild: "/api/tunnel/list/child", // 隧道设计信息-tree-二级
    tunnelContent: "/api/tunnel/content", //隧道设计信息
    uploadTunnelContent: "/api/tunnel/content/url", // 隧道设计信息-content-上传
    pdfPreView: "/api/tunnel/pdf", // pdf预览
    userList: "/api/user/list", // 用户列表
    searchUser: "/api/user/search", // 用户搜索
    addUser: "/api/user/add", // 用户添加
    delUser: "/api/user/del", //用户删除
    preViewUser: "/api/user/preview", //用户预更新
    updateUser: "/api/user/update", // 用户修改
};

export default base;
