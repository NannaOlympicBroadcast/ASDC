const { app, BrowserWindow,dialog,Menu} = require('electron')


let winInstance = null

let template = [
    {
        label:'Suno',
        submenu:[
            {
                label:'国服',
                click:()=>{
                    winInstance.loadURL("https://suno.cn")
                }
            },
            {
                label:'国际服',
                click:()=>{
                    winInstance.loadURL("https://suno.ai")
                }
            }
        ]
    },
    {
        label:'Download',
        submenu:[
            {
                label:'下载当前页面音乐',
                click:()=>{
                    const url = winInstance.webContents.getURL()
                    const regex = /https:\/\/suno\.com\/song\/([0-9a-fA-F-]+)/;
                    const match = url.match(regex);
                    if(!match){
                        dialog.showMessageBox(winInstance,{
                            type:'error',
                            title:'下载失败',
                            message:"国区suno可以直接打开歌曲详情->'···'->'下载音频'",
                        })
                    }else {
                        let songId = match[1]
                        const dlwin = new BrowserWindow({
                            width:600,
                            height:400,
                            title:"点击三个点保存"
                        })
                        dlwin.loadURL("https://cdn1.suno.ai/"+songId+".mp3")
                    }

                }
            }
        ]
    },
    {
        label: "Community",
        submenu: [
            {
                label: "作品成果展示",
                click:()=>{
                    winInstance.loadFile("artworks.html")
                }
            },
            {
                label: "心得交流（敬请期待）"
            },
            {
                label: "登录（敬请期待）"
            },
            {
                label: "AI歌曲创意大赛（敬请期待）"
            }
        ]
    },
    {
        label: "Page",
        submenu: [
            {
                label: "前进",
                click:()=>{
                    winInstance.webContents.goForward()
                }
            },
            {
                label: "后退",
                click:()=>{
                    winInstance.webContents.goBack()
                }
            },
            {
                label: "后退",
                click:()=>{
                    winInstance.webContents.reload()
                }
            }
        ]
    }
]
const createWindow = () => {
    winInstance = new BrowserWindow({
        width: 1200,
        height: 800
    })

    winInstance.loadFile('index.html')
}
const menu = Menu.buildFromTemplate(template)
//主进程设置应用菜单
Menu.setApplicationMenu(menu)
app.whenReady().then(() => {
    createWindow()
})