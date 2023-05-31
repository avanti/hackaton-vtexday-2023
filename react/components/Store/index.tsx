import React, { useEffect, useState } from 'react'

/* Imports */
import { useQuery } from 'react-apollo'

/* Queries */
import EXAMPLE from '../../graphql/queries/getAffiliate.gql'

/* Styles */
import styles from './index.modules.css'

export default () => {
  const [RESTData, setRESTData] = useState(null)
  const [GraphQLData, setGraphQLData] = useState(null)

  const { data, error } = useQuery(EXAMPLE, {
    ssr: false,
  })

  useEffect(() => {
    fetch('/_v/boilerplate-node/example')
      .then((response) => response.json())
      .then((json) => setRESTData(json))
  }, [])

  useEffect(() => {
    data && setGraphQLData(data)
    error && console.error(error)
  }, [data, error])

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Avanti Fullstack Boilerplate - Store</h1>
        <p>This is the Store component.</p>
      </div>

      {/* REST Data */}
      <div className={styles.content}>
        {RESTData && (
          <>
            <h3>REST Data:</h3>
            <pre className={styles.code}>
              <code>{JSON.stringify(RESTData, null, 2)}</code>
            </pre>
          </>
        )}

        {/* GraphQL Data */}
        {GraphQLData && (
          <>
            <h3>GraphQL Data:</h3>
            <pre className={styles.code}>
              <code>{JSON.stringify(GraphQLData, null, 2)}</code>
            </pre>
          </>
        )}
      </div>
    </div>
  )
}
