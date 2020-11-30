import {gql} from '@apollo/client'

export const ITEMS_QUERY = gql`
{
    headers {
      header_id
      header_name
    }
    rows {
      row_id
    }
    values {
      header_id
      row_id
      value
    }
  }
`;
export const CELL_UPDATE = gql`
    mutation CellUpdate($header_id: Int, $row_id: Int, $value:String) {
        update_values(where: {header_id: {_eq: $header_id}, _and: {row_id: {_eq: $row_id}}}, _set: {value: $value}) {
            returning {
                value
            }
        }
      }
`
export const HEADER_NAME_UPDATE = gql`
    mutation HeaderNameUpdate($header_id: Int, $value:String) {
        update_headers(where: {header_id: {_eq: $header_id}}, _set: {header_name: $value}) {
            returning {
                header_name
            }
        }
      }
`