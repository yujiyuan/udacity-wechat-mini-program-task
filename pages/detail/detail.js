// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    console.log(options.id);
    //1523074607642
    const id = options.id || 1523074607642
    this.getDetailData(id)
  },

  getDetailData(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        // success
        console.log("res",res);
        const result = res.data.result;
        this.setData({
          result
        })
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
      }
    })
  }
})