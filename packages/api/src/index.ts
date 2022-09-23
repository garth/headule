// import { createServer } from "@graphql-yoga/node";
// import { builder } from "./builder";

// builder.queryType({
//   fields: (t) => ({
//     hello: t.string({
//       args: {
//         name: t.arg.string(),
//       },
//       resolve: (parent, { name }) => `hello, ${name || "World"}`,
//     }),
//   }),
// });

// const server = createServer({
//   schema: builder.toSchema(),
// });

// server.start();

import { createServer } from '@graphql-yoga/node'
import { schema } from './schema'

const server = createServer({
  schema,
})

server.start().catch((error) => {
  console.error(error)
})
