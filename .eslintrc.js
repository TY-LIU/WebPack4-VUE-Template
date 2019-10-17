module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // required to lint *.vue files
    plugins: [
        "vue"
    ],
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // check if imports actually resolve
    /* settings: {
        "import/resolver": {
            "webpack": {
                "config": "build/webpack.base.conf.js"
            }
        }
    }, */
    // add your custom rules here
    rules: {
        // 这里写自定义规则
        // 参数：0 关闭，1 警告，2 错误
        "indent": ["error", 4,                  // 强制使用一致的缩进 4个空格
            {"SwitchCase": 1}
        ],
        // script标签下第一个缩进
        "vue/script-indent": ["error", 4, {
            "baseIndent": 1,
            "switchCase": 1,
            "ignores": []
        }],
        "comma-dangle": 2,                      // 要求或禁止末尾逗号
        "no-use-before-define": 2,              // 禁止在变量定义之前使用它们
        "semi": 0,
        "no-extra-semi": 2,                     // 禁止不必要的分号
        "import/no-duplicates": 0,              // 禁止重复导入
        "no-new": 0,                            // 禁止使用 new 以避免产生副作用
        "new-cap": 2,                           // 要求构造函数首字母大写
        "new-parens": 0,
        "no-undef-init": 2,                     // 变量初始化时不能直接给它赋值为undefined
        "default-case": 2,                      // 要求 Switch 语句中有 Default 分支 (default-case)
        "no-empty": 1,                          // 禁止出现空语句块
        "no-extra-label": 1,                    // 禁用不必要的标签
        "no-empty-function": 1,                 // 禁止出现空函数
        "no-eval": 1,                           // 禁用 eval()
        "no-implied-eval": 2,                   // 禁止使用类似 eval() 的方法
        "object-curly-spacing": ["error", "never"],
        "quotes": ["error", "single"],
        "no-multi-spaces": 0,
        "no-const-assign": 2,                   // 禁止修改 const 声明的变量
        "no-this-before-super": 1,              // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        "no-undef": 1,                          // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        "no-unreachable": 2,                    // 不可能执行到的代码
        "no-unused-vars": 1,                    // 禁止出现未使用过的变量
        "constructor-super": 1,                 // 要求在构造函数中有 super() 的调用
        "valid-typeof": 1,                      // 无效的类型判断
        "no-sparse-arrays": 1,                  // 数组中多出逗号
        "one-var": 0,                           // 强制函数中的变量在一起声明或分开声明 (one-var)
        "no-shadow-restricted-names": 2,        // 关键词与命名冲突
        "no-cond-assign": 2,                    // 条件语句中禁止赋值操作
        "no-native-reassign": 2,                // 禁止覆盖原生对象
        "no-unexpected-multiline": 2,           // 行尾缺少分号可能导致一些意外情况
        "no-trailing-spaces": 0,
        "accessor-pairs": 1,                    // object getter/setter方法需要成对出现
        "no-lone-blocks": 1,                    // 多余的{}嵌套
        "no-labels": 1,                         // 无用的标记
        "no-sequences": 1,                      // 禁止可能导致结果不明确的逗号操作符
        "space-infix-ops": 1,                   // 操作符前后空格
        "no-global-assign": ["error", {         // 不允许对全局变量赋值,如 window = 'abc'
            // 定义例外
            // "exceptions": ["Object"]
        }],
        "no-debugger": 1,                       // debugger 调试代码未删除
        "no-console": 0,                        // console 未删除
        "no-dupe-args": 2,                      // 参数重复
        "no-dupe-keys": 2,                      // 对象属性重复
        "no-duplicate-case": 2,                 // case重复
        "no-unused-expressions": 0,             // 禁止未使用过的表达式
        //要求或禁止函数圆括号之前有一个空格
        "space-before-function-paren": [0, "never"],
        "no-warning-comments": [                // 标记未写注释
            1,
            {
                "terms": [
                    "todo",
                    "fixme",
                    "any other term"
                ],
                "location": "anywhere"
            }
        ]
    },
    //.vue文件 indent限制重写
    "overrides": [
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]
};
