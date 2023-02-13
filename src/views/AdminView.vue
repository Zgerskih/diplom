<script setup lang="ts">
import AdminComp from '@/components/AdminComp.vue'
import ObjectsComp from '@/components/ObjectsComp.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'


const { user } = storeToRefs(useUserStore())
const onUserLoginClick = () => {}

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
  <AdminComp v-if="user" />

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
      <div class="flex-auto"> <AdminComp /></div>

     <div class="columns-2">
      <div class="border-2">
          <div v-if="isObjectsLoading">Loading</div>
          <ObjectsComp v-else :objects="objects" />
      </div>
    </div>
	</div>
</template>

