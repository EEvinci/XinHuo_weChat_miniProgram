// 管理所有的请求
import ajax from './request'
import wxLogin from './request_login'
let base_url = 'https://mpapi.iynn.cn/api/v1/'
// 首页热点新闻接口
export function GetnewsHot(data){
  return ajax(base_url+'news/hot','get',data)
}

// 首页新闻列表接口
export function GetnewsList(data){
  return ajax(base_url+'news','get',data)
}


// 首页新闻搜索接口
export function GetnewsSearch(data){
  return ajax(base_url+'news/search','get',data)
}


// 首页新闻详情接口
export function GetnewsDetail(data){
  return ajax(base_url+'news/'+data.id,'get')
}

// 登录接口
export function GetLogin(data){
  return ajax(base_url+'login','post',data)
}
