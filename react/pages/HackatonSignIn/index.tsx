import React, { useState } from 'react'
import cn from 'classnames'

/* Imports */
//import { useQuery } from 'react-apollo'

/* Queries */
//import EXAMPLE from '../../graphql/example.gql'

/* Styles */
import styles from './hackatonSignIn.css'
import Input from '../../components/Store/Input'

type Supplier = {
  address?: string
  addressComplement?: string
  cep?: string
  cpf?: string
  email?: string
  name?: string
  phone?: string
}

export default () => {
  //const [GraphQLData, setGraphQLData] = useState(null)

  const [supplier, setSupplier] = useState<Supplier>()

  /*const { data, error } = useQuery(EXAMPLE, {
    ssr: false,
  })

  useEffect(() => {
    data && setGraphQLData(data)
    error && console.error(error)
  }, [data, error])*/

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Supplier,
  ) => {
    console.log(event.currentTarget.value)
    const value = event.currentTarget.value
    setSupplier((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  return (
    <section className={cn(styles.appWrapper)}>
      <header className={cn(styles.header)}>
        <h1>
          BEM-VINDO AO <span className="blue">PROGRAMA DE AFILIADOS</span>
        </h1>
        <h2>
          Preencha o formulário abaixo e confirme os dados para nossa revisão.
          Todas as informações serão utilizadas legalmente e devidamente
          protegidas em acordo com a nossa Política de Privacidade. Ansiosos
          para te ter a bordo!
        </h2>
      </header>

      <main>
        <form>
          {console.log({ supplier })}
          <Input
            type="text"
            placeholder="Digite seu Nome"
            value={supplier?.name || ''}
            onChange={(e) => handleInput(e, 'name')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Digite seu CPF"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'cpf')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Digite seu CEP"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'cep')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Digite seu Endereço"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'address')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Complemento de endereço"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'addressComplement')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Digite seu E-mail"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'email')}
            disabled={false}
          />

          <Input
            type="text"
            placeholder="Digite seu Telefone"
            value={supplier?.cpf || ''}
            onChange={(e) => handleInput(e, 'phone')}
            disabled={false}
          />

          <button onClick={() => alert('yay')}>submit</button>
        </form>
      </main>

      <footer>My app footer</footer>
    </section>
  )
}
