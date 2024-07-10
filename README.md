## Controle de despesas

 - O Sistema deve ser possivel se cadastrar
 - O Sistema deve ser possivel realizar autenticação

CADASTRO DE USUARIO
    id
    nome
    email
    senha
    updatedAt
    createdAt

 - Deve ser possivel uma vez autenticado, poder editar nome e senha
 - Deve ser possivel uma vez autenticado, excluir a conta

ORÇAMENTOS DO USUARIO
    usuarioId
    nome
    data
    valor
    dataVencimento
    updatedAt
    createdAt


- Deve ser possivel uma vez autenticado, editar um orçamento ou remover

RENDAS DO USUARIO
    usuarioId
    nome
    data
    valor
    updatedAt
    createdAt

- Deve ser possivel uma vez autenticado, editar uma renda ou remover

ADIÇÔES

- Pagina de relatorios, que mostre por periodos determinados as diferenças de entradas e saidas