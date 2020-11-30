//import {useMemo} from 'react'
import { useQuery } from "@apollo/client";
import { ITEMS_QUERY } from './constants'
import { HeaderCell } from './HeaderCell';
import { RowCell } from './RowCell';
import useTableModel from './useTableModel'

export function Table() {
    const { data } = useQuery(ITEMS_QUERY);
    const tableModel = useTableModel(data);
    if(!data) return null;
    return (
        <table>
            <thead>
                <tr>
                    {tableModel.getHeaders().map( col => {
                        return <HeaderCell key={col.header_id}
                                    header_id={col.header_id}
                                    val={col.header_name}>
                                </HeaderCell>
                    })}
                </tr>
            </thead>
            <tbody>
            {
                tableModel.getRows().map( row => {
                    return <tr key={row.row_id}>
                        {tableModel.getHeaders().map( col => {
                            const key = col.header_id + '_' + row.row_id;
                            // const obj = cellMap.get(key)
                            const obj = tableModel.getRowCell(key)
                            const val = obj ? obj.value : ''
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