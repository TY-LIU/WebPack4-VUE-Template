// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: [
        require('autoprefixer'),                //自动添加前缀
        require('postcss-opacity'),             //透明度兼容
        require('cssnano')({
            reduceIdents: false,                  //防止keyframes被压缩 https://github.com/ben-eb/cssnano/issues/247
            autoprefixer: false,                  //防止与上面autoprefixer冲突
            zindex: false,                        //取消重置zindex
            discardUnused: false,
            mergeIdents: false
        })
    ]
};
