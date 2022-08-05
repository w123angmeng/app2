<template>
    <div class="about">
        <h1>This is app2-demo1</h1>
        <el-button type="primary" @click="dialogData.visible = true">弹窗</el-button>

        <el-button type="primary" @click="btnClickLink">跳转到门诊护士站</el-button>
        <el-button type="primary" @click="btnClickLink1">首页</el-button>
        <!-- 公共组件 -->
        <!-- <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog> -->
    </div>

</template>
<script>
    export default {
        data: () => {
            return {
                dialogData: {
                    visible: false,
                    content: "这是app2-调用父组件"
                }
            }
        },
        //  components: { 
        //   CommonDialog: window.__POWERED_BY_QIANKUN__ ? window.commonComponent.CommonDialog :
        //      import('@/components/HelloWorld.vue')
        // },
        methods: {
            handleClose(data) {
                console.log("app2 子组件监听到弹窗关闭", data)
            },
            btnClickLink() {
                window.history.pushState(null, '', '/outpNurse/outpNurseUniversalPrint')
                // this.$router.push({
                //             path: "/outpNurse/outpNurseUniversalPrint"
                //         })
            },
            btnClickLink1() {
                window.history.pushState(null, '', '/')
            }
        }
    };
</script>