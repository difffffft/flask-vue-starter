import {defineStore} from 'pinia'
import {useDictTypeAllApi} from '@/api/sys/dict'

const useAppStore = defineStore('appStore', {
    state: () => ({
        // sidebar 是否展开
        sidebarOpened: false,
        // 字典列表
        dictList: [],
    }),
    actions: {
        setSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened
        },
        async getDictListAction() {
            const {data} = await useDictTypeAllApi()
            this.dictList = data || []
        }
    }
})
export default useAppStore