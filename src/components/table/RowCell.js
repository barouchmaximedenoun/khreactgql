import {useState} from 'react'
import { useMutation } from "@apollo/client";
import { CELL_UPDATE } from './constants';

export const RowCell = ({val, header_id, row_id, ...rest}) => {
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateCell, {error}] = useMutation(CELL_UPDATE)
    if(error) {
        console.log(`error mutating cell header_id=${header_id} row_id=${row_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating cell, check your network connection or contact your system administrator')
    }
    return (<td data-testid="row-cell" onClick={() => setShowEditMode(true)}>
        {showEditMode ? 
            <>
                <input data-testid="input-row-cell"
                    defaultValue={cellVal} 
                    onBlur={async (e) => {
                        setShowEditMode(false)
                        await updateCell({variables: {header_id, row_id, value: e.target.value}})
                            .catch((err) =>{
                                console.log(`error updating cell header_id=${header_id} row_id=${row_id} value=${val}`, err)
                                // Todo display in toaster component for now use alert
                                alert('error updating cell, internal error please contact your system administrator') 
                            })
                        setCellVal(e.target.value);
                    }} /> 
            </>
            : cellVal}
    </td>)
}