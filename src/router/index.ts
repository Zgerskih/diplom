import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ObjectsView from '../views/ObjectsView.vue'
import ContactsView from '../views/ContactsView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'About',
			component: AboutView,
		},
		{
			path: '/Objects',
			name: 'Objects',
			component: ObjectsView,
		},
		{
			path: '/Contacts',
			name: 'Contacts',
			component: ContactsView,
		},
		{
			path: '/Admin',
			name: 'Admin',
			component: AdminView,
		},
	],
})

export default router
