class Cs {
    /**
     * 插入显示区域
     * @Ahthor: xiaoxi
     * @param {*} dom
     */
    constructor(dom) {
        this.appendContainer(dom)
    }

    // /**
    //  * 安全维护函数
    //  * 等级默认3级
    //  * @Ahthor: xiaoxi
    //  * @param {*} level
    //  */
    // SecurityMaintenance(level = 3) {
    //     switch (level) {
    //     case 3:
    //         // 禁止localStorage
    //         window.localStorage.getItem = tips
    //         window.localStorage.setItem = tips
    //         // 禁止访问cookie
    //         window.document.cookie = tips()
    //         // 禁止访问父级
    //         window.parent = null
    //         break
    //     default:
    //         break
    //     }
    //     function tips(params) {
    //         return '为了安全起见，该方法已经被禁用。'
    //     }
    // }

    appendContainer(dom) {
        // 添加样式
        dom.classList.add('cs_console_container')
        // 创建标题
        let newInsertElement = document.createElement('h1')
        newInsertElement.innerText = 'CodeShare控制台'
        dom.appendChild(newInsertElement)
        // 创建提示词
        newInsertElement = document.createElement('p')
        newInsertElement.innerText = 'codeshare工具类包已经加载完毕，下面将会显示您的输出信息。'
        dom.appendChild(newInsertElement)
        // 创建打印输出容器
        newInsertElement = document.createElement('div')
        newInsertElement.id = 'cs_logs_container'
        dom.appendChild(newInsertElement)
    }

    watchLogsAndError() {
        // 监听代码错误全局异常捕获
        window.onerror = function(message, source, lineno, colno, error) {
            cs.insertLog('[ERROR]: ' + message, 'log-item-red', lineno - 4)
        }
        console.oldLog = console.log
        // 重写打印输出函数，实现获取输出内容
        console.log = cs.log.bind(this)
    }

    // 插入到页面的显示区域函数 - codeshare辅助性函数
    insertLog(message, className = 'log-item', line = '-1') {
        const newInsertElement = document.createElement('div')
        newInsertElement.classList.add(className)
        newInsertElement.innerHTML = message
        const span = document.createElement('span')
        span.innerHTML = `${line}`
        span.style.float = 'right'
        newInsertElement.appendChild(span)
        // newInsertElement.onclick = () => {
        //     window.parent.postMessage(JSON.stringify({ line }), window.location.href)
        // }
        document.getElementById('cs_logs_container').appendChild(newInsertElement)
    }

    dynamicLoadCss(url) {
        const head = document.getElementsByTagName('head')[0]
        const link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.href = url
        head.appendChild(link)
    }

    info() {
        console.log(`
        CodeShare JS 调试工具脚本 2.2
        Aut: xiaoxi
        Msg：您的代码处理专家。
        Url: blog.diyxi.top
        `)
    }

    log(T, err = new Error()) {
        // 调用原先的打印
        console.oldLog(T)
        // 匹配所在行数
        const regexp = /:[0-9]+:[0-9]+/g
        let array = []
        let line = '[未知]'
        // 如果能够获得行数
        if (err.stack != null) {
            array = [...err.stack.matchAll(regexp)]
            line = parseInt(array[1][0].substring(1).split(':')[0]) - 4
        }
        // 判断是否对象，是对象需要格式化成文本
        if (T instanceof Object) {
            T = JSON.stringify(T, null, 4)
            T = T.replaceAll(' ', '&nbsp;')
            T = T.replaceAll('\n', '<br>')
        }
        // 插入到显示区域
        this.insertLog(T, 'log-item', line)
    }

    setExample(Examples) {
        this.Examples = Examples
    }

    judge() {
        if (cs.runCode == null) {
            cs.insertLog('[ERROR]: ' + 'runCode代码为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        if (cs.Examples == null) {
            cs.insertLog('[ERROR]: ' + 'Examples为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        for (const item of this.Examples) {
            const out = cs.runCode(item.key)
            this.insertLog(
                `输入：${JSON.stringify(item.key)}，正确输出：${item.value}，您的输出：${out}。`
                , 'log-item'
                , '[cs处理器]')
            if (JSON.stringify(out) != JSON.stringify(item.value)) {
                cs.insertLog('[ERROR]: ' + '以上用例未通过。', 'log-item-red', '[cs处理器]')
                return
            }
        }
        cs.insertLog('[WINNER]: ' + '恭喜你！所有用例通过！', 'log-item-green', '[cs处理器]')
    }
}
const newInsertElement = document.createElement('div')
newInsertElement.id = '124106_codeshare_utils_c'
document.body.appendChild(newInsertElement)
const cs = new Cs(document.getElementById('124106_codeshare_utils_c'))
cs.info()
cs.dynamicLoadCss('https://codeshare2.diyxi.top/css/codesharePreview.css')
cs.watchLogsAndError()
