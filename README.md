![icon](https://cdn-icons-png.flaticon.com/128/3658/3658773.png)

# README Template

Pequena descrição sobre o app e seus casos de uso.

## Importante!

Anotações importantes antes de seguir para a instalação do App.

## Instruções:

Instruções de uso do app e pontos importantes.

## Estrutura:

Estrutura para facilitar a navegação nos diretórios do app.

### Pastas:

```bash
- admin/
	- navigation.json
	- routes.json

- graphql/
	- types/
		- # ...
	- schema.graphql

- mdv2/
	- # Masterdata samples...

- messages/
	- en.json
	- es.json
	- pt.json

- node/
	- clients/
		- # Client methods...
	- middlewares/
		- # Middlewares for REST Api...
	- resolvers/
		- # Resolvers for GraphQL...
	- index.ts # Links, middlewares and resolvers
	- service.json # Routes and configs

- react/
	- components/
		- # ...
	- admin/
		- # Admin components...
	- store/
		- # Store components...
	- graphql/
		- # GraphQL queries and mutations...

- store/
	- interfaces.json
```

## Instalação no front-end:

A instalação deste app deve ser algo fluido e rápido de se fazer:

- Simplesmente adicione o app `avantivtexio.example@0.x` as peerDependencies do seu projeto.
- Execute no terminal o comando **vtex setup** para instalar o tipos.
  - `vtex setup`

...

## Backend

O backend possui, além da lógica responsável pelo Supplier Protocol, uma camada GraphQL para gerenciamento de afiliados.

| Queries                |                                                                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getAffiliates`        | Retorna todos os afiliados cadastrado. Recebe paginação e campo aberto de busca no formato do Master Data.                                                                                                              |
| `getAffiliateById`     | Retorna um afiliado baseado em seu ID.                                                                                                                                                                                  |
| `getAffiliateByMail`   | Retorna um afiliado baseado em seu email.                                                                                                                                                                               |
| `getAffiliateByCode`   | Retorna um afiliado baseado em seu código.                                                                                                                                                                              |
| `getAffiliateOrders`   | Retorna os pedidos onde foram utilizados códigos de afiliado. Recebe o ID do afiliado, paginação, filtro de data e indicação se deve retornar somente os pedidos do afiliado, somente os de seus subafiliados ou ambos. |
| `getSubAffiliatesData` | Retorna os dados básicos dos subafiliados, como nome, número de vendas (contando somente pedidos que não estejam com o status `payment-pending` ou `canceled`) e status.                                                |

| Mutations                |                                                                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createAffiliate`        | Cria um novo afiliado na loja.                                                                                                                                               |
| `approveOrDenyAffiliate` | Altera o status de um afiliado com base no booleano `approve` enviado                                                                                                        |
| `setupApp`               | Faz o setup dos schemas necessários para o funcionamento do app. Só precisa ser executada em lojas que ainda não tiveram setup ou que estão com versões antigas dos schemas. |

---

### TODOs:

- [x] ...

### Observações:

_Fique a vontade para fazer a melhoria que achar necessário, e considere abrir um pull request, para podermos ajudar a melhorar o app._
