import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Link } from 'vtex.render-runtime'

/* Imports */
//import { useQuery } from 'react-apollo'

/* Queries */
//import EXAMPLE from '../../graphql/example.gql'

/* Mutations */
import CREATE_AFFILIATE from '../../graphql/mutations/createAffiliate.gql'

/* Styles */
import styles from './hackatonSignIn.css'
import Input from '../../components/Store/Input'
import { useMutation } from 'react-apollo'
import Modal from '../../components/Store/Modal'
import { MdCheckCircleOutline } from 'react-icons/md'

type CepResponse = {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

type Supplier = {
  cep?: string
  cpf?: string
  email?: string
  name?: string
  phone?: string
  sponsor?: string
  address?: SupplierAddress,
}

type SupplierAddress = {
  postalCode?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  city?: string
  state?: string
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
    name: 'email',
    placeholder: 'Digite seu E-mail',
    type: 'email',
    mask: '',
  },
  {
    name: 'phone',
    placeholder: 'Digite seu Telefone',
    type: 'text',
    mask: '(99) 99999-9999',
  }
]

const ADDRESS_FIELDS: Array<{
  name: keyof SupplierAddress
  placeholder: string
  type: string
  mask: string
}> = [
  {
    name: 'postalCode',
    placeholder: 'Digite seu CEP',
    type: 'text',
    mask: '99999-999',
  },
  {
    name: 'state',
    placeholder: 'Selecione seu estado',
    type: 'text',
    mask: '',
  },
  {
    name: 'city',
    placeholder: 'Selecione sua cidade',
    type: 'text',
    mask: '',
  },
  {
    name: 'neighborhood',
    placeholder: 'Selecione seu bairro',
    type: 'text',
    mask: '',
  },
  {
    name: 'street',
    placeholder: 'Digite o nome de sua rua',
    type: 'text',
    mask: '',
  },
  {
    name: 'number',
    placeholder: 'Digite o numero de sua residência',
    type: 'text',
    mask: '',
  },
  {
    name: 'complement',
    placeholder: 'Complemento',
    type: 'text',
    mask: '',
  },

]

export default () => {
  //const [GraphQLData, setGraphQLData] = useState(null)

  const [supplier, setSupplier] = useState<Supplier>({})
  const [affiliateCode, setAffiliateCode] = useState<string>()

  const [createAffiliate, { data, loading, error }] = useMutation(CREATE_AFFILIATE)

  useEffect(() => {
    if(error){
      alert('Não foi possível completar o cadastro, tente novamente mais tarde')
    }
  }, [data,loading, error])

  const getAddressByCep = async (cep: string) => {
    const result: CepResponse =
      cep?.length > 0 &&
      (await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json())

    const [tipoLogradouro, ...logradouro] = result.logradouro.split(' ')

    const clientData = {
      bairro: result.bairro,
      cidade: result.localidade,
      estado: result.uf,
      logradouro: logradouro.reduce((prev, curr) => prev + ' ' + curr),
      tipoEndereco: tipoLogradouro,
    }

    setSupplier((prevState) => ({...prevState, address: {
      city: clientData.cidade,
      state: clientData.estado,
      neighborhood: clientData.bairro,
      street: `${clientData.tipoEndereco} ${clientData.logradouro}`
    }}))

  }


  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Supplier,
  ) => {
    const value = event.currentTarget.value

    setSupplier((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleAddressInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof SupplierAddress,
  ) => {
    const value = event.currentTarget.value

    setSupplier((prevState) => ({
      ...prevState,
      address: { 
        ...prevState.address,
        [field]: value
      },
    }))

    if(field === 'postalCode'){
      const newValue = value.replace(/\D/g, '')

      if(newValue && newValue.length === 8){
        getAddressByCep(newValue.replace(/\D/g, ''))
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedValues: Supplier = Object.entries(supplier)
      .map(([key, value]) => {
        if (['cep', 'cpf', 'phone'].includes(key)) {
          const normalizedValue = typeof value === 'string' ? value?.replace(/\D/g, '') : value
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

    const response = await createAffiliate(
      {
        variables:{
          input: {
            affiliateId: String(Date.now()),
            name: normalizedValues.name,
            cpf: normalizedValues.cpf,
            email: normalizedValues.email,
            gender: "MALE",
            sponsor: {email: normalizedValues.sponsor},
            address: {
              postalCode: normalizedValues.address?.postalCode || '',
              street: normalizedValues.address?.street || '',
              number: normalizedValues.address?.number || '',
              neighborhood: normalizedValues.address?.neighborhood || '',
              complement: normalizedValues.address?.complement || '',
              city: normalizedValues.address?.city || '',
              state: normalizedValues.address?.state || ''
            },
            phone: normalizedValues.phone
          }
        }
      }
    )

    if(response?.data?.createAffiliate?.affiliateCode){
      setAffiliateCode(response.data.createAffiliate.affiliateCode)
    }
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
              value={!!supplier && field.name !=='address' ? supplier[field.name] : ''}
              onChange={(e) => handleInput(e, field.name)}
            />
          ))}

          {ADDRESS_FIELDS.map((field) => (
            <Input
              mask={field.mask}
              type={field.type}
              placeholder={field.placeholder}
              value={!!supplier?.address ? supplier.address[field.name] : ''}
              onChange={(e) => handleAddressInput(e, field.name)}
            />
          ))}

            <section className={styles.sponsorContainer}>
            <h5 className={styles.sponsorInputCall}>Recebeu código de um patrocinador? informe abaixo e finalize seu cadastro</h5>
            <Input
                mask={''}
                type='email'
                className={styles.sponsorInput}
                placeholder={'E-mail do patrocinador'}
                value={!!supplier ? supplier['sponsor'] : ''}
                onChange={(e) => handleInput(e, 'sponsor')}
              />
            </section>


          <button type="submit" className={cn(styles.button)}>
            Cadastrar
          </button>
        </form>
      </main>

      {!!affiliateCode ? <Modal setOpenModal={setAffiliateCode} >
        <section className={cn(styles.successModal)}>
          <header>
            <MdCheckCircleOutline size={64} className={cn(styles.successModalSVG)}/>
            <h2>Cadastrado com sucesso</h2>
          </header>
          <main>
            <h3>Aguardando a aprovação do lojista</h3>
            <h3>Seu código de Afiliado é <span>{affiliateCode}</span></h3>
          </main>
          <footer>
            <Link to='/'>Voltar para a Home</Link>
          </footer>
        </section>
      </Modal> : null}

    </section>
  )
}
