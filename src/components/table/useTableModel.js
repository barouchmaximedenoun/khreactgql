import { useMemo } from 'react';

const useTableModel = ({headers, rows, values} = {headers:[], rows:[], values: []}) => {
    const cellMap = useMemo(
        () => {
            const cellMap = new Map()
            for(let item of values) {
                const key = item.header_id + '_' + item.row_id;
                cellMap.set(key, item);
            }
            return cellMap;
        }, [values]
    )
    // console.log(cellMap.values());
    const result = useMemo(
        () => {
            return {
                getRowCell(key) {
                    return cellMap.get(key);
                },
                getHeaders(comparator = (a, b) => a.header_id - b.header_id, asc = true) {
                    return asc ? headers.slice().sort(comparator) : headers.slice().sort(comparator).reverse();
                },
                getRows(comparator = (a, b) => a.row_id - b.row_id, asc = true) {
                    return asc ? rows.slice().sort(comparator) : rows.slice().sort(comparator).reverse();
                }
            }
        }, [cellMap, headers, rows]
    )
    return result;
} 
export default useTableModel;