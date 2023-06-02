import React, { useEffect, useState } from 'react'

/* Imports */
import { useQuery } from 'react-apollo'

/* Queries */
import EXAMPLE from '../../graphql/queries/getAffiliate.gql'

import { Layout, PageHeader, PageBlock } from 'vtex.styleguide'

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
    <Layout
      pageHeader={
        <PageHeader
          title="Avanti Fullstack Boilerplate - Admin"
          subtitle="Admin template for building custom apps."
        />
      }
    >
      <PageBlock variation="full">
        <div>Here goes your content!</div>
        <div>
          {/* REST Data */}
          <div>
            {RESTData && (
              <>
                <h3>REST Data:</h3>
                <pre>
                  <code>{JSON.stringify(RESTData, null, 2)}</code>
                </pre>
              </>
            )}

            {/* GraphQL Data */}
            {GraphQLData && (
              <>
                <h3>GraphQL Data:</h3>
                <pre>
                  <code>{JSON.stringify(GraphQLData, null, 2)}</code>
                </pre>
              </>
            )}
          </div>
        </div>
      </PageBlock>
    </Layout>
  )
}
