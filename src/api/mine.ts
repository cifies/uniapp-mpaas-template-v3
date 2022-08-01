import { request } from '@/api/request'

export const getSiteConfig = () => {
  return request.get('/api/site.json')
}

// 获取所有文章分类
export const getSiteCategories = () => {
  return request.get('/api/categories.json')
}

// 获取所有文章标签
export const getSiteTags = () => {
  return request.get('/api/tags.json')
}

// 获取某一标签下的所有文章
export const getPostsByTag = (tag?: string) => {
  return request.get(`api/tags/${tag}.json`)
}

// 获取某一分类下的所有文章
export const getPostsByCategorie = (categorie?: string) => {
  return request.get(`api/categories/${categorie}.json`)
}
