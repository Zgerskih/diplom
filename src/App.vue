<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
const onUserLoginClick = () => {}
</script>

<template>
	<header class="bg-amber-300">
		<div class="columns-2">
			<div>Название</div>
			<div class="place-self-start md:place-self-end">
				<img alt="Vue logo" src="@/assets/logo.svg" width="50" height="50" />
			</div>
		</div>

		<div class="p-2">
			<nav class="bg-green-200, columns-5, flex-row">
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/"
					>Главная
				</RouterLink>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/About"
					>О нас</RouterLink
				>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Objects"
					>Объекты</RouterLink
				>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Contacts"
					>Контакты</RouterLink
				>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Admin"
					>админ</RouterLink
				>
				<div v-if="!user">
					<span>
						<label for="username">Username</label>
						<input id="username" />
					</span>
					<span>
						<label for="password">Password</label>
						<input id="password" />
					</span>
					<button @click="onUserLoginClick">Login</button>
				</div>
			</nav>
		</div>
	</header>
	<RouterView />
</template>
