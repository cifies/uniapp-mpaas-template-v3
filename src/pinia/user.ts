import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      articleNum: 0 // 自动推导类型
    }
  },
  getters: {
    getArticleNum: (state) => state.articleNum
  },
  actions: {
    changeArticleNum(num: number) {
      this.articleNum = num
    }
  }
})
