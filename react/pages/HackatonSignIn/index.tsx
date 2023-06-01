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

const FIELDS: Array<{
  name: keyof Supplier
  placeholder: string
  type: string
  mask: string
}> = [
  {
    name: 'name',
    placeholder: 'Digite seu Nome',
    type: 'text',
    mask: '',
  },
  {
    name: 'cpf',
    placeholder: 'Digite seu CPF',
    type: 'text',
    mask: '999.999.999-99',
  },
  {
    name: 'cep',
    placeholder: 'Digite seu CEP',
    type: 'text',
    mask: '99999-999',
  },
  {
    name: 'address',
    placeholder: 'Digite seu Endereço',
    type: 'text',
    mask: '',
  },
  {
    name: 'addressComplement',
    placeholder: 'Complemento de endereço',
    type: 'text',
    mask: '',
  },
  {
    name: 'email',
    placeholder: 'Digite seu E-mail',
    type: 'text',
    mask: '',
  },
  {
    name: 'phone',
    placeholder: 'Digite seu Telefone',
    type: 'text',
    mask: '(99) 99999-9999',
  },
]

export default () => {
  //const [GraphQLData, setGraphQLData] = useState(null)

  const [supplier, setSupplier] = useState<Supplier>({})

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
    const value = event.currentTarget.value

    setSupplier((prevState) => ({
      ...prevState,
      [field]: value,
    }))
    console.log({ supplier })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedValues = Object.entries(supplier)
      .map(([key, value]) => {
        if (['cep', 'cpf', 'phone'].includes(key)) {
          const normalizedValue = value?.replace(/\D/g, '')
          return { key, value: normalizedValue } as {
            key: keyof Supplier
            value: string
          }
        }

        return { key, value } as { key: keyof Supplier; value: string }
      })
      .reduce(function (collector, field) {
        return Object.assign({}, collector, {
          [field.key]: field.value,
        })
      }, {})

    console.log({ normalizedValues })
    /*if (['cep', 'cpf', 'phone'].includes(field)) {
      const normalizedValue = value.replace(/\D/g, '')
    }*/

    fetch
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

      <main className={cn(styles.main)}>
        <form onSubmit={(e) => handleSubmit(e)} className={cn(styles.form)}>
          {FIELDS.map((field) => (
            <Input
              mask={field.mask}
              type={field.type}
              placeholder={field.placeholder}
              value={!!supplier ? supplier[field.name] : ''}
              onChange={(e) => handleInput(e, field.name)}
            />
          ))}
          <button type="submit" className={cn(styles.button)}>
            Cadastrar
          </button>
        </form>
      </main>
    </section>
  )
}
