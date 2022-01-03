const fetch = require("cross-fetch");

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://recepie.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result;
}

const operationsDoc = `
    mutation insertUser {
      insert_users_one(object: {email: "kalu@ymaa.com", password: "pp"}) {
        email
        id
        password
      }
    }
  `;

function executeInsertUser() {
  return fetchGraphQL(operationsDoc, "insertUser", {});
}

async function startExecuteInsertUser() {
  const { errors, data } = await executeInsertUser();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startExecuteInsertUser();
