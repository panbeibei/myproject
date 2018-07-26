//获取歌曲列表
export let getMusicList = ()=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url:'https://www.easy-mock.com/mock/5b02c42c6c3270356c903667/example/afgcxxxaxgf',
            success:(res)=>{
               resolve(res.data)
            },fail:(err)=>{
                reject(err)
            }
        })
    })
}
