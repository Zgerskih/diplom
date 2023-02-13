<script setup lang="ts">
import ObjectsComp from '@/components/ObjectsComp.vue'
import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, reactive,  ref } from 'vue'



const variables = reactive({
	limit: 10,
	offset: 0,
})
const {
	result,
	loading: isObjectsLoading,
	onResult,
} = useSubscription(
	gql`
		subscription GetObjectsStreamingSubscription(
			$limit: Int = 10
			$offset: Int = 10
		) {
			objects(limit: $limit, offset: $offset) {
				id
				title
				image
				description
			}
		}
	`,
	variables
)
onResult(result => {
	console.log(result.data)
})

const objects = computed(() => result.value?.objects || [])
</script>

<template>
	<div class="box-content h-10 w-1000 p-1 border-1">
		<div v-if="isObjectsLoading">Loading</div>
		<div v-else>
			<ObjectsComp :objects="objects" />
		</div>
	</div>
</template>
