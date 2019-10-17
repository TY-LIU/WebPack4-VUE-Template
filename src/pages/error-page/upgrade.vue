<!--
 Author: LTY
 Create Time: 2018-07-12 16:56
 Description: 升级或者更换浏览器
 -->
<template>
    <div class="body">
        <h1>温馨提示：<strong>您的浏览器需要更新才能访问哦</strong></h1>
        <h2>请使用 <strong>QQ浏览器</strong>、<strong>火狐浏览器</strong>、<strong>谷歌浏览器</strong>、<strong>搜狗浏览器</strong>、<strong>360浏览器</strong>
            浏览器访问~</h2>
        <p>
            <a href="https://browser.qq.com/" target="_blank" title="qq浏览器：双核浏览器，兼容性良好，有广告，内核版本较新，可以一试">
                <img src="~sysStatic/images/error/QQBrowser.png" alt="qq浏览器">
            </a>
            <a href="http://www.firefox.com/" target="_blank" title="火狐浏览器：独立强大的Gecko内核，快速、美观，无广告，兼容性优秀，强烈推荐">
                <img src="~sysStatic/images/error/firefox.png" alt="火狐浏览器">
            </a>
            <a href="https://sm.myapp.com/original/Browser/67.0.3396.99_chrome_installer.exe" target="_blank"
               title="谷歌浏览器：WebKit内核，搭载V8引擎，简单、快速、无广告，兼容性最好，非常优秀的一款浏览器，极力推荐">
                <img src="~sysStatic/images/error/Chrome.png" alt="谷歌浏览器">
            </a>
            <a href="http://ie.sogou.com/" target="_blank" title="搜狗浏览器：双核浏览器，兼容性良好，有广告，不推荐">
                <img src="~sysStatic/images/error/sougou.png" alt="搜狗浏览器">
            </a>
            <a href="https://browser.360.cn/se/" target="_blank" title="360浏览器：双核浏览器，兼容性一般，非常多广告，不要安装">
                <img src="~sysStatic/images/error/360.png" alt="360浏览器">
            </a>
        </p>
        <h3>如果您是双核浏览器，如"QQ浏览器"、"360浏览器"、"搜狗浏览器" 等，请在地址栏右侧点击 <i class="fab fa-internet-explorer"></i> 图标切换至"急速模式"即可</h3>
        <h4>Please update to a modern browser</h4>
    </div>
</template>

<script>
    export default {
        name: 'upgrade',
        data: function () {
            return {}
        },
        components: {}
    }
</script>

<style scoped lang="less">
    h1, h2, h3, h4 {
        color: #666;
        font-family: arial;
        margin: 20px 0;
    }

    strong {
        border-bottom: 1px dotted #930;
        font-weight: normal;
        padding-bottom: 2px;
        color: #930;
    }

    .body {
        display: block;
        text-align: center;
        padding-top: 50px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #F7F8FD;
    }

    p {
        padding: 50px 0;
        letter-spacing: 20px;
    }
</style>
