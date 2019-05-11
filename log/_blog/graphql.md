# You want to learn GraphQL, and you want to have learned it yesterday

GraphQL is quickly becoming the show runner in how services leverage their APIs.
Because it is a _specification_ rather than an all-encompassing tool, GraphQL can be tailored on top of any platform by use of individual libraries made for a variety of servers. Developers can describe their data, ask for exactly what they want, and get predictable results.

Okay, cool. So, what's the big deal?

## Origins

If you've seen my previous post, you know I like to begin with an overview on how these new technologies arise and why they are so crucial to the future of software engineering.

To refresh, Application Program Interfaces (APIs) expose specific internal data that other services can harness. Just like how user interfaces are meant to guide humans through use of an application, APIs are meant for software to interact with other software through endpoints routed via Universal Resource Identifiers (URIs).

Unlike humans, computers don't need fancy buttons or legible font-styles to navigate an API, but programmers were still left a harsh environment to efficiently manipulate code that would allow these machines to do just that.

Simple Object Access Protocol (SOAP) was pretty much all there was to construct these interfaces. It consisted of manually curated XML documents that had to abide by strict protocol specifications, and usually didn't respond with error stacks to help find existing bugs.

The need for an organized, less complex standard  birthed the RESTful architecture most modern web services use today.

## REST

Representational State Transfer (REST) is merely an adopted
style for designing APIs over the HTTP protocol, directly accessing the delivery methods that the HTTP protocol provides: `GET`, `POST`, `PUT`, `DELETE`.

These requests determine what happens to the data that gets sent and/or what data gets sent back as a response. If you want just a portion of that data, you have to define more specific URI endpoints, or add query parameters that target such distinctions. This can lead to lengthy, unused endpoint definitions and intricate queries that can easily become a headache for anyone to manage.

```javascript
GET '/'                  // respond with all (root) data
GET '/users'             // respond with user data
GET '/users/userId'      // specified endpoint for one user's data
GET '/users?id=userId'   // query string for one user's data
```

Suppose you could do the filtering on the front-end if you set up your API to just send general requests, but this can slow down overall runtime due to excess and unnecessary information being carried over in the payload each time.

Can you see where we're going with this?

## GraphQL

GraphQL introduces a query language (hence the "QL") to the front-end, which allows us to condense our code by always sending a `POST` request to a single middleware endpoint: `('/graphql')`. Unlike `GET` requests that are read-only, the `POST` delivery method holds a request body that we can construct our queries inside of to be sent and interpreted by the GraphQL specifications on the back-end.

It is a typed language, which means that we can define what our data should look like before our code even runs, making sure that what is returned is exactly what we expect.

Here's a GraphQL boilerplate for a super simple Task app I created using Node.js, Express and PostgreSQL/Sequelize.

```javascript
import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import { buildSchema } from 'graphql'
import { Tasks } from '../database'

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Task {
      id: ID!
      title: String!
      description: String!  ${/* ! === not null */''}
    }

    input TaskInput {
      title: String!
      description: String!
    }

    type RootQuery {  ${/* entry point for fetching data */''}
      tasks: [Task!]!
        ${/* returns a list (Array) of Task data types */''}
        ${/* cannot return 'null' and cannot return an Array with 'null' */''}
        ${/* add as many endpoints to this object as needed */''}
    }

    type RootMutation {  ${/* entry point for manipulating data */''}
      createTask(taskInput: TaskInput!): Task!
        ${/* custom param 'taskInput' takes a TaskInput data type */ ''}
        ${/* returns a Task data type */''}
        ${/* add as many operations to this object as needed */''}
    }

    schema {
      query: RootQuery  ${/* points to query entry point */''}
      mutation: RootMutation  ${/* points to mutation entry point */''}
    }
  `),
  rootValue: {
    tasks: () => {
      return Tasks.findAll()  // query the database
      .then(allTasks => allTasks)  // return all tasks as defined in our RootQuery
      .catch(err => {
        console.log(err)
        throw err
      })
    },
    createTask: args => {  // 'args' is an object of all listed parameters
      const { title, description } = args.taskInput  // destructuring assignment

      const newTask = {  // assign TaskInput properties to a new task object
        title,
        description
      }

      return Tasks.create(newTask)  // query database to create the new task
      .then(createdTask => createdTask)  // return created task as defined in our RootMutation
      .catch(err => {
        console.log(err)
        throw err
      })
    }
  },
  graphiql: true
}))
```

### **graphqlHttp()**

This middleware function routes requests through our query parser `'/graphql'` endpoint, to be handled by the schemas that we define, to be forwarded to the associated resolver endpoints that we create.

It takes an object with these main properties:
- `schema` - points to where we determine what our data should look like
- `rootValue` - points to an object of resolver functions that match our schema endpoints

### **buildSchema()**

This function takes a multi-line template literal string that actually defines our schemas. It parses and converts that string to be used by our middleware, which sends our data to the appropriate resolvers for handling. We must adhere to GraphQL command specifications that are looking for certain keywords:

- `type` - custom objects (*NOTE: the type names 'RootQuery'/'RootMutation' are just by convention but they can be called anything you want, as long as your schema points to them*)
- `input` - specific type of custom object
- `schema` - takes root keywords
   - `query` - entry point for `GET` requests
   - `mutation` - entry point for `POST/PUT/DELETE` requests

### **graphiql**

The ultimate addition to this API implementation is GraphQL's built-in debugger. `GraphiQL` is a UI that can be accessed in the browser to accurately check our endpoints. Simply add it to the end of our middleware object and turn it on/off with a boolean.

`SHOW GRAPHIQL`

---

As endpoints and resolvers grow, breaking these functions into their own modules helps keep things organized, with easy-to-follow paths for maintainability of design structure and overall data quality. It's easy to compare to the standard RESTful paradigm--now we can specify _exactly_ how we want our data to look by defining variable data types, in turn allowing us to ask for completely unique combinations of data, rendering predictable responses without the overload of gratuitous traffic. This ultimately saves trips between the client-sever cycle for optimized functionality.

GraphQL is the perfect example to showcase the exponential growth in refining the processes we utilize every day when accessing the web, whether you're a programmer or not!

The most fascinating aspect of this evolution, and just software development in general, is the  ability to continually transform; abstraction upon abstraction. All in the name of Developer Experience (DX), recalling a past instructor's assertion that "most developers create solutions not because they are visionaries, but because they are frustrated." Any enhancement to programming's ease-of-use will pave the way for heightened general accessability, and the faster we can guide newcomers in grasping these concepts, the faster we can work together in finding valid solutions.
