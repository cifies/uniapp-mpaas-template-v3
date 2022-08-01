import { request } from '@/api/request'

export const homeList = (data: { pageNum: number } = { pageNum: 1 }) => {
  return request.get(`api/posts/${data.pageNum}.json`)
}

// 博客内容详情
export const detailContent = (url = '') => {
  return request.get(`/${url}`)
}
