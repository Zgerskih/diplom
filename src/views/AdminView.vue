<script setup lang="ts">
import Catalog from '@/components/catalog/Catalogs.vue'
import AdminComp from '@/components/AdminComp.vue'
import ObjectsComp from '@/components/ObjectsComp.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import Catalogs from '@/components/catalog/Catalogs.vue'

const { result, loading: isObjectsLoading } = useQuery(gql`
	query GetObjects {
		objects {
			id
			title
			image
			description
		}
	}
`)

const objects = computed(() => result.value?.objects || [])
</script>

<template>
	<div class="columns-auto">
		<div class="box-content h-10 w-1000 p-1 border-1">
			<div v-if="isObjectsLoading">Loading</div>
			<ObjectsComp v-else :objects="objects" />
		</div>
		<div>
			<AdminComp />
			<Catalogs />
		</div>
	</div>
</template>
