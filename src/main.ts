import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable'
import {
	ApolloClient,
	split,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

import App from './App.vue'
import router from './router'
import './assets/index.css'

const headers = {
	'x-hasura-admin-secret':
		'5NsweJM8mY2u1zWOsNc86Jw6X9M3FN09Q1p7E5lllQa1YtCYOOzdQq4koDX4iBuu',
}

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: 'https://select-wren-77.hasura.app/v1/graphql',
	headers,
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: 'wss://select-wren-77.hasura.app/v1/graphql',
	options: {
		reconnect: true,
		lazy: true,
		timeout: 30000,
		inactivityTimeout: 30000,
		connectionParams: () => {
			return { headers }
		},
	},
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	httpLink
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: link,
	cache,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
provideApolloClient(apolloClient)
app.mount('#app')
