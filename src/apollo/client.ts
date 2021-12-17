// import {
//   ApolloClient
// } from 'apollo-client'
// import {
//   InMemoryCache
// } from 'apollo-cache-inmemory'
// import {
//   HttpLink
// } from 'apollo-link-http'

// export const client = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06',
//   }),
//   cache: new InMemoryCache(),
//   // shouldBatch: true,
// })

// export const healthClient = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.thegraph.com/index-node/graphql',
//   }),
//   cache: new InMemoryCache(),
//   // shouldBatch: true,
// })

// export const v1Client = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap',
//   }),
//   cache: new InMemoryCache(),
//   // shouldBatch: true,
// })

// export const stakingClient = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.thegraph.com/subgraphs/name/way2rach/talisman',
//   }),
//   cache: new InMemoryCache(),
//   // shouldBatch: true,
// })

// export const blockClient = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks',
//   }),
//   cache: new InMemoryCache(),
// })

// export const autonomyHistory = new ApolloClient({
//   link: new HttpLink({
//       uri: 'https://api.studio.thegraph.com/query/2719/autonomy-subgraph-polygon/v.0.1.2',
//   }),
//   cache: new InMemoryCache(),
// })

import { ApolloClient, InMemoryCache } from '@apollo/client'

export const healthClient = new ApolloClient({
  uri: 'https://api.thegraph.com/index-node/graphql',
  cache: new InMemoryCache(),
})

export const blockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const arbitrumClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
})

export const arbitrumBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
})

export const optimismClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
})

export const optimismBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
})
