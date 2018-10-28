//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 0, //导航栏选中的元素脚标
    type:"gn",//默认查询的新闻类型
    navData: [
      //导航栏内容
      {
        text: '国内',
        type: 'gn'
      },
      {
        text: '国际',
        type: 'gj'
      },
      {
        text: '财经',
        type: 'cj'
      },
      {
        text: '娱乐',
        type: 'yl'
      },
      {
        text: '军事',
        type: 'js'
      },
      {
        text: '体育',
        type: 'ty'
      },
      {
        text: '其他',
        type: 'other'
      }
    ],
    swiperImgList: [],//滑块视图
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("hz");
    this.getNewsData(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    this.getNewsData();
  },
  
 
  navTabChange(event) {
    
    const currentTab = event.currentTarget.dataset.current
    const type = event.currentTarget.dataset.type
    if (type !== this.data.type) {
      this.setData({ currentTab: currentTab, type });
      this.getNewsData();
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
    
  },
  getNewsData(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { type:  this.data.type },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res=> {
        // success
        let result = res.data.result;
        
        
        let swiperImgList = result.map((item) => {
         
          let times = this.setDate(item.date);
          return {
            ...item,date:times
          }
        })
        console.log('swiperImgList', swiperImgList);
        this.setData({ swiperImgList })
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '出错了！',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function() {
        // complete
        typeof callback === "function" && callback();
      }
    })
  },
  setDate(date){
    var d = new Date(date)

    var times = `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + Number(d.getMonth() + 1)}-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()} ${d.getHours() > 9 ? d.getHours() : '0' + Number(d.getHours())}:${d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()}:${d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds()}`
    return times
  },
  toDetail(event){
    console.log('event====>', event)
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
