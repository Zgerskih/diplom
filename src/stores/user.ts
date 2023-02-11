import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({ user: null }),
	actions: {
		login(userData: any) {
			this.user = userData
		},
	},
})
