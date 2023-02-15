<script setup lang="ts">
import AdminComp from '@/components/AdminComp.vue'
import ObjectsComp from '@/components/ObjectsComp.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {computed, inject} from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import {ResponseTypes} from "@authorizerdev/authorizer-js";
const authRef: any = inject('auth');

const userStore = useUserStore();
const { authenticate } = userStore;
const { user, token } = storeToRefs(userStore)

const onUserLoginClick = async () => {
  console.log('onUserLoginClick', authRef);
  const res: any = await authRef.authorize({
    response_type: ResponseTypes.Token,
    use_refresh_token: false,
  })
  await authenticate(res, authRef);
  console.log('onUserLoginClick: res = ', res);
}

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
  <div v-if="user" >
    <AdminComp />
    <div>
      <div class="columns-2">
        <div class="border-2">
          <div v-if="isObjectsLoading">Loading</div>
          <ObjectsComp v-else :objects="objects" />
        </div>
      </div>
    </div>
  </div>

  <div v-else>
      <button @click="onUserLoginClick">Login</button>
  </div>
</template>

