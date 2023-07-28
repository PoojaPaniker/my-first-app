var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    Policy(
        limit: Int,
        offset: Int,
        orderBy: [Policy_OrderByInput],
        where: Policy_FilterInput,
        first: Int,
        after: String
    ): Policy_Connection
    node(id: ID!): Node
}


type Policy implements Node {
    id: ID!
    name: String
    createdDate: String
}

type Policy_Connection {
    edges: [Policy_Edge]
    pageInfo: PageInfo!
}

type Policy_Edge {
    cursor: String!
    node: Policy
}

input Policy_FilterInput {
    and: [Policy_FilterInput]
    not: Policy_FilterInput
    or: [Policy_FilterInput]
    id: IDOperator
    name: StringOperator
    createdDate: StringOperator
}

input Policy_OrderByInput {
    id: OrderByClause
    name: OrderByClause
}

interface Node {
    id: ID!
}

enum NullsOrder {
    NULLS_FIRST
    NULLS_LAST
}

input OrderByClause {
    direction: Direction
    nulls: NullsOrder
}

type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
}

input StringOperator {
    eq: String
    gt: String
    ge: String
    in: [String]
    like: String
    lt: String
    le: String
    ne: String
    nin: [String]
}

input BooleanOperator {
    eq: Boolean
    gt: Boolean
    gebolded: Boolean
    in: [Boolean]
    like: Boolean
    lt: Boolean
    le: Boolean
    ne: Boolean
    nin: [Boolean]
}

enum Direction {
    ASC
    DESC
}

input FloatOperator {
    eq: Float
    gt: Float
    ge: Float
    in: [Float]
    like: Float
    lt: Float
    le: Float
    ne: Float
    nin: [Float]
}

input IDOperator {
    eq: ID
    gt: ID
    ge: ID
    in: [ID]
    like: ID
    lt: ID
    le: ID
    ne: ID
    nin: [ID]
}

input IntOperator {
    eq: Int
    gt: Int
    ge: Int
    in: [Int]
    like: Int
    lt: Int
    le: Int
    ne: Int
    nin: [Int]
}
`)

function Policy (id, name, createdDate) {
    return {
        id : id,
        name: name,
          createdDate: createdDate
    };
   };

function Policy_Edge(cursor,id,name,createdDate) {
    const policy = new Policy(id,name,createdDate);
    return {
        cursor : cursor,
        node: policy
    };
   };

function PageInfo() {

    return {
        endCursor : 'cursor',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor:'startcusro'
    };
   };


   function Policy_Connection() {
    const edges = [new Policy_Edge("abc",1001,"myPolicy","2022-01-01"),new Policy_Edge("xyz",1002,"Myanotherpolicy","2023-01-01")];
    const pageInfo = new PageInfo();
    return {
        edges : edges,
        pageInfo: pageInfo 
    };
   };

// The root provides a resolver function for each API endpoint
var root = {
    Policy: () => {
        const policyConnect = new Policy_Connection();
      return policyConnect;
    },
  }
  
  var app = express()
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  )
  app.listen(4000)
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")