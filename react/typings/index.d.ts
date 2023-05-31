/* Styleguide import fix */
declare module 'vtex.styleguide'

/* GraphQL typing */
declare module "*.gql" {
  const content: any
  export default content
}

/* Style typing */
declare module '*.css' {
  const content: Record<string, string>
  export default content
}