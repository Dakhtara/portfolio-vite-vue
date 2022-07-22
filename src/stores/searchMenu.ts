import {defineStore} from "pinia";

export const useSearchMenuStore = defineStore('searchMenu',
    {
        state: () => {
            return {
                isOpen: false
            }
        },
        actions: {
            toggle() {
                this.isOpen = !this.isOpen
            },
            hide() {
                this.isOpen = false
            }
        }
    }
)
