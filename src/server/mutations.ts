import { gql } from "@apollo/client"

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        secondName
        email
      }
    }
  }
`

export const Signup = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $secondName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      secondName: $secondName
    )
  }
`

export const EditUser = gql`
  mutation EditUser(
    $id: Int!
    $email: String!
    $firstName: String!
    $secondName: String!
    $password: String
  ) {
    editUser(
      id: $id
      email: $email
      firstName: $firstName
      secondName: $secondName
      password: $password
    ) {
      id
      firstName
      secondName
      email
    }
  }
`
