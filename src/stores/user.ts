import {ref, computed, inject} from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({ user: null, token: null }),
	actions: {
		async authenticate(res: any, authRef: any) {
			if (res && res.access_token) {
				// you can use user information here, eg:
				const user = await authRef.getProfile({
					Authorization: `Bearer ${res.access_token}`,
				})
				console.log('onUserLoginClick: user = ', user);
				this.user = user
				this.token = res.access_token;
			}
		},
	},
})
