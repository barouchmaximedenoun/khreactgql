import {makeStyles} from '@material-ui/core/styles';
import { useQuery } from "@apollo/client";
import { ITEMS_QUERY } from './constants'
import { HeaderCell } from './HeaderCell';
import { RowCell } from './RowCell';
import useTableModel from './useTableModel';

const useStyles = makeStyles(theme => {
    return {
        table: {
            width: '100%',
            height: '100%',
        },
        thead: {
            width: '100%',
            height: '20px',
        },
        tr: {
        },
        tbody: {
            height: 'calc(100% -20px)',
            width: '100%',
            overflow: 'auto',
        }
    }
});
export function Table() {
    const classes = useStyles()
    const { data } = useQuery(ITEMS_QUERY);
    const tableModel = useTableModel(data);
    if(!data) return null;
    return (
        <table className={classes.table}>
            <thead className={classes.thead}>
                <tr className={classes.tr}>
                    {tableModel.getHeaders().map( col => {
                        return <HeaderCell key={col.header_id}
                                    header_id={col.header_id}
                                    val={col.header_name}>
                                </HeaderCell>
                    })}
                </tr>
            </thead>
            <tbody className={classes.tbody}>
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