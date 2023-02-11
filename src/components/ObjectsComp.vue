<script setup lang="ts">
defineProps({
	objects: Array,
})
</script>

<template>
	<div class="bg-green-100, flex-auto">
		<div class="bg-green-100">
			<div class="columns-auto, flex-auto">
				<div v-for="object in objects" :key="object.id">
					<img class="" :src="object.image" />
					<div class=" ">{{ object.title }}</div>
					<div>{{ object.description }}</div>
				</div>
			</div>
		</div>
	</div>

	<div class="">
		<div></div>
	</div>
</template>
