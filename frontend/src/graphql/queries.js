import { gql } from '@apollo/client';

export const GET_TASKS = gql`
query GetTasks($page: Int!) {
  tasks(page: $page) {  
    tasks { 
      id
      title
      description
      status
      createdAt
    }
    total
    page
    perPage
  }
}
`;
