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
			<h1 class="text-xl">АГЕНСТВО НЕДВИЖИМОСТИ</h1>
			<div class="place-self-start md:place-self-end">
        <RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Admin"
        >
				<img class="float-right" alt="Vue logo" src="@/assets/logo.svg" width="50" height="50" />
        </RouterLink>
			</div>
		</div>

		<div class=" p-2">
			<nav class="flex-1, container mx-auto px-4, columns-5, flex-row">
				<RouterLink class="text-xl, box-content h-10 w-10 p-1 border-1" to="/"
					>Главная</RouterLink>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/About"
					>О нас</RouterLink>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Objects"
					>Объекты</RouterLink>
				<RouterLink class="box-content h-10 w-10 p-1 border-1" to="/Contacts"
					>Контакты</RouterLink>



			</nav>
		</div>
	</header>
	<RouterView />
</template>
