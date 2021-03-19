/*
 * @Description: file information
 * @Author: will
 * @Date: 2021-03-15 18:13:00
 * @LastEditors: will
 * @LastEditTime: 2021-03-16 19:13:01
 */
export const request = (params) => {
    //定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}