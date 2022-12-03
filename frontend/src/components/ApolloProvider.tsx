import { PropsWithChildren } from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';

export default function ApolloClientProvider(props: PropsWithChildren) {
    const httpLink = createHttpLink({
        uri: import.meta.env.VITE_API_URI as string,
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token') as string;
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${JSON.parse(token)}` : ""
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}