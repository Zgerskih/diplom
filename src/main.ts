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
	// 'X-Hasura-Role': 'user'
	// 'x-hasura-admin-secret':
	// 	'5NsweJM8mY2u1zWOsNc86Jw6X9M3FN09Q1p7E5lllQa1YtCYOOzdQq4koDX4iBuu',
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
const authLink = setContext((_, {headers:any }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		}
	}
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

import {Authorizer, ResponseTypes} from '@authorizerdev/authorizer-js'
import {useUserStore} from "@/stores/user";
import {setContext} from "@apollo/client/link/context";

const authRef = new Authorizer({
	authorizerURL: 'https://localhost:8080/',
	redirectURL: window.location.origin,
	clientID: '99a6b1a9-c662-4fa2-af97-144702d72178', // obtain your client id from authorizer dashboard
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('auth', authRef)
provideApolloClient(apolloClient)
app.mount('#app')

const res: any = await authRef.getSession({}).catch((e) => {
	console.log("e", e);
});
console.log("res", res);
useUserStore().authenticate(res, authRef);
