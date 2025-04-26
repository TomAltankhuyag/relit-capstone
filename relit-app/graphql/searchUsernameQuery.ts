import * as APITypes from "@/graphql/API";


// copied from queries.ts
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

const searchUsernameQuery = /* GraphQL */ `query searchUsername($username: String!) {
    listUsers(filter: {username: {eq: $username}}) {
        items {
            userID
            password
            salt
        }
    }
}` as GeneratedQuery<APITypes.searchUsernameQueryVariables, APITypes.searchUsernameQuery>

export default searchUsernameQuery