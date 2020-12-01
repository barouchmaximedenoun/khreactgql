import {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { useMutation } from "@apollo/client";
import { CELL_UPDATE } from './constants';

const useStyles = makeStyles(theme => {
    return {
        td: {
            backgroundColor: '#fafcfd',
            '&:hover': {
                backgroundColor: '#eef8fd',
            }
        },
    }
});
export const RowCell = ({val, header_id, row_id, ...rest}) => {
    const classes = useStyles()
    const [showEditMode, setShowEditMode] = useState(false);
    const [cellVal, setCellVal] = useState(val);
    const [updateCell, {error}] = useMutation(CELL_UPDATE)
    if(error) {
        console.log(`error mutating cell header_id=${header_id} row_id=${row_id} val=${val}`, error)
        // Todo display in toaster component for now use alert
        alert('error updating cell, check your network connection or contact your system administrator')
    }
    return (
    <td data-testid="row-cell" 
        className={classes.td}
        onClick={() => setShowEditMode(true)}
        onBlur={() => setShowEditMode(false)}>
        {showEditMode ? 
            <input data-testid="input-row-cell"
                defaultValue={cellVal} 
                onBlur={async (e) => {
                    setShowEditMode(false);
                    try{
                        await updateCell({variables: {header_id, row_id, value: e.target.value}})
                        setCellVal(e.target.value);
                    }
                    catch(err) {
                        console.log('updateCell err=',err);
                    }
                }} />
            : cellVal}
    </td>)
}