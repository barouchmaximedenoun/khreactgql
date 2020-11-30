import {useMemo, useState} from 'react'
import {gql} from '@apollo/client'
import { useQuery, useMutation } from "@apollo/react-hooks";

const ITEMS_QUERY = gql`
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
const CELL_UPDATE = gql`
    mutation CellUpdate($header_id: Int, $row_id: Int, $value:String) {
        update_values(where: {header_id: {_eq: $header_id}, _and: {row_id: {_eq: $row_id}}}, _set: {value: $value}) {
            returning {
                value
            }
        }
      }
`
const HEADER_NAME_UPDATE = gql`
    mutation HeaderNameUpdate($header_id: Int, $value:String) {
        update_headers(where: {header_id: {_eq: $header_id}}, _set: {header_name: $value}) {
            returning {
                header_name
            }
        }
      }
`
/* const DataModel = (data) => {
    return {
        table: ({ 
            sort: ({header: { col_id, asc, comparator}}) => {},
            header: { col_id, asc, sort} = {},
            converter = () => {},
            ...rest} ) => {
            return {
                headers: [],
                rows: [],
            }
        }
    }
} 
useModel()
*/
const RowCell = ({val, header_id, row_id, ...rest}) => {
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateCell, {error}] = useMutation(CELL_UPDATE)
    if(error) {
        console.log(`error updating cell header_id=${header_id} row_id=${row_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating cell, check your network connection or contact your system administrator')
    }
    return (<td onClick={() => setShowEditMode(true)}>
        {showEditMode ? 
            <>
                <input defaultValue={cellVal} 
                    onBlur={async (e) => {
                        setShowEditMode(false)
                        await updateCell({variables: {header_id, row_id, value: e.target.value}})
                            .catch((err) =>{
                                console.log(`error updating cell header_id=${header_id} row_id=${row_id} val=${val}`, error)
                                // Todo display in toaster component for now use alert
                                alert('error updating cell, internal error please contact your system administrator')                        
                            })
                        setCellVal(e.target.value);
                    }} /> 
            </>
            : cellVal}
    </td>)
}
const HeaderCell = ({val, header_id, ...rest}) => {
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateHeaderName, {error}] = useMutation(HEADER_NAME_UPDATE)
    if(error) {
        console.log(`error updating header header_id=${header_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating header, check your network connection or contact your system administrator')
    }
    return (<th onClick={() => setShowEditMode(true)}>
        {showEditMode ? 
            <>
                <input defaultValue={cellVal} 
                    onBlur={async (e) => {
                        setShowEditMode(false)
                        await updateHeaderName({variables: {header_id, value: e.target.value}})
                            .catch((err) =>{
                                console.log(`error updating header header_id=${header_id} val=${val}`, error)
                                // Todo display in toaster component for now use alert
                                alert('error updating header, internal error please contact your system administrator')                        
                            })
                        setCellVal(e.target.value);
                    }} 
                    onClick={(e) => console.log(e)}/> 
            </>
            : cellVal}
    </th>)
}
export function Table() {
    const { data } = useQuery(ITEMS_QUERY);
    console.log(data)
    const cellMap = useMemo(
        () => {
            const cellMap = new Map()
            if(!data) return cellMap;
            for(let item of data.values) {
                const key = item.header_id + '_' + item.row_id;
                cellMap.set(key, item);
            }
            return cellMap;
        }, [data]
    )
    console.log(cellMap.values())
    if(!data) return null;
    return (
        <table>
            <thead>
                <tr>
                    {data.headers.map( col => {
                        /* return <th key={col.header_id}>
                            {col.header_name}
                        </th> */
                        return <HeaderCell key={col.header_id}
                                    header_id={col.header_id}
                                    val={col.header_name}>
                                </HeaderCell>
                    })}
                </tr>
            </thead>
            <tbody>
            {
                data.rows.map( row => {
                    return <tr key={row.row_id}>
                        {data.headers.map( col => {
                            const key = col.header_id + '_' + row.row_id;
                            const obj = cellMap.get(key)
                            const val = obj ? obj.value : 'hi'
                            console.log(key, cellMap.get(key), val)
                            return (<RowCell key={key} 
                                        header_id={col.header_id} 
                                        row_id={row.row_id}
                                        value_id={col.value_id}
                                        val={val}></RowCell>)
                        })}
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}  