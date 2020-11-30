import {useState} from 'react';
import { useMutation } from "@apollo/client";
import { HEADER_NAME_UPDATE } from './constants'

export const HeaderCell = ({val, header_id, ...rest}) => {
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateHeaderName, {error}] = useMutation(HEADER_NAME_UPDATE)
    if(error) {
        console.log(`error updating header header_id=${header_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating header, check your network connection or contact your system administrator')
    }
    return (<th data-testid="header-cell" onClick={() => setShowEditMode(true)}>
        {showEditMode ? 
            <>
                <input data-testid="input-header-cell"
                    defaultValue={cellVal} 
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