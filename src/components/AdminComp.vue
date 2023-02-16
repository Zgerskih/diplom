<script setup lang="ts">
import { ref } from 'vue'

import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { mutate: insertObject } = useMutation(gql`
	mutation InsertOne($image: String = "", $title: String = "") {
		insert_objects_one(object: { image: $image, title: $title }) {
			id
		}
	}
`)

const inputTitle = ref<HTMLInputElement | null>(null)
const inputImage = ref<HTMLInputElement | null>(null)
const inputDescription = ref<HTMLInputElement | null>(null)
const onAddClicked = () => {
	console.log('> AdminComp - onAddClicked:', inputTitle.value?.value)
	insertObject({
		title: inputTitle.value!.value,
		image: inputImage.value!.value,
		image: inputDescription.value!.value,
	})
}
</script>

<template>
	<div class="flex-auto">
		<div class="mt-5">
			<input ref="inputTitle" value="Title" />
      <input ref="inputDescription" value="Title" />
			<input
				ref="inputImage"
				value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8brBENR0hGf6ub874PzSIB4kpIUnsAGeqErhJj1MEZQMK7tQoaWaPsFatap3emtnwcA&usqp=CAU"
			/>
			<div>
				<button
					:disabled="
						inputTitle &&
						inputImage &&
						inputTitle.value.length === 0 &&
						inputImage.value.length === 0
					"
					@click="onAddClicked"
				>
					Add
				</button>
			</div>
		</div>
	</div>
</template>
