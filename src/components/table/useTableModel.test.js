import {render} from '@testing-library/react'
import useTableModel from './useTableModel'

function setup(...args) {
    const returnVal = {}
    function TestComponent() {
      Object.assign(returnVal, useTableModel(...args))
      return null
    }
    render(<TestComponent />)
    return returnVal
  }
test('should have model when data undefined', async () => {
    const data = undefined;
    const tableModel = setup(data);
    expect(tableModel.getRowCell("any")).not.toBeDefined()
    expect(tableModel.getHeaders()).toStrictEqual([])
    expect(tableModel.getRows()).toStrictEqual([])
})
test('should return valid model', async () => {
    const data = {
        headers:[
            {header_id:2, header_name: 'col2' },
            {header_id:1, header_name: 'col1'}
        ], 
        rows:[
            {row_id:5},
            {row_id:1}
        ], 
        values: [
            {row_id: 5, header_id:2, value: '1'},
            {row_id: 5, header_id:1, value: '2'},
            {row_id: 1, header_id:2, value: '3'},
            {row_id: 1, header_id:1, value: '4'},
        ]};
    const tableModel = setup(data);
    let key = 2 + '_' + 5;
    expect(tableModel.getRowCell(key)).toStrictEqual({row_id: 5, header_id:2, value: '1'});
    key = 1 + '_' + 1;
    expect(tableModel.getRowCell(key)).toStrictEqual({row_id: 1, header_id:1, value: '4'});
    
    expect(tableModel.getHeaders()).toStrictEqual([{header_id:1, header_name: 'col1'}, {header_id:2, header_name: 'col2' },])
    expect(tableModel.getRows()).toStrictEqual([{row_id:1}, {row_id:5}])
})