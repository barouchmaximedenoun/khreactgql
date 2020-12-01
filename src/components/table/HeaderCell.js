import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { useMutation } from "@apollo/client";
import { HEADER_NAME_UPDATE } from './constants'

const useStyles = makeStyles(theme => {
    return {
        th: {
            backgroundColor: '#eaf3fd',
            position: 'sticky',
            top: 0, 
            boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)',
            '&:hover': {
                backgroundColor: '#00adff4f',
            }
        },
    }
});
export const HeaderCell = ({val, header_id, ...rest}) => {
    const classes = useStyles()
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateHeaderName, {error}] = useMutation(HEADER_NAME_UPDATE)
    if(error) {
        console.log(`error updating header header_id=${header_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating header, check your network connection or contact your system administrator')
    }
    return (
    <th data-testid="header-cell" 
        className={classes.th}
        onClick={() => setShowEditMode(true)}>
        {showEditMode ? 
            <input data-testid="input-header-cell"
                defaultValue={cellVal} 
                onBlur={async (e) => {
                    setShowEditMode(false)
                    try {
                        await updateHeaderName({variables: {header_id, value: e.target.value}})
                        setCellVal(e.target.value);
                    }
                    catch(err) {
                        console.log('updateHeaderName err=',err);
                    }
                }}/> 
            : cellVal}
    </th>)
}