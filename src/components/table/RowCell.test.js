import { MockedProvider } from '@apollo/client/testing'
import { RowCell } from './RowCell'
import {render as rtlRender, fireEvent} from '@testing-library/react'

import { CELL_UPDATE } from './constants';

const gqlApiMocks = [
    {
        request: {
            query: CELL_UPDATE,
            variables: {header_id: 1, row_id: 5, value: 'mynewname'},
        },
        result: () => {
            return {
                data:{
                    update_values: {
                        returning: [{
                            value: 'mynewname',
                        }]
                    }
                }
            }
        }
    }
]
function render(apolloMock, {header_id, row_id, key, val}) {
    const {getByTestId, findByTestId, getByText, findByText, debug} = rtlRender(
        <MockedProvider mocks={apolloMock} addTypename={false}>
            <table>
                <tbody>
                    <tr>
                        <RowCell key={key} 
                        header_id={header_id} 
                        row_id={row_id}
                        val={val} />
                    </tr>
                </tbody>
            </table>
        </MockedProvider>
    )
    return {
        debug,
        getByText,
        findByText,
        getByTestId,
        findByTestId,
    }
}
test('should render without error', async () => {
    const initialValues = {header_id: 1, row_id: 5, key: 1, val: 'test'}
    const {getByText} = render(gqlApiMocks, initialValues)
    expect(getByText(/test/i)).toBeInTheDocument() 
})
test('should render after change', async () => {
    const initialValues = {header_id: 1, row_id: 5, key: 1, val: 'test'}
    //await act( async () => {
    const {getByTestId, findByTestId} = render(gqlApiMocks, initialValues)
    const comp = getByTestId("row-cell");
    fireEvent.click(comp)
    const input = await findByTestId("input-row-cell");
    fireEvent.change(input, {target: {value: 'mynewname'}})
    fireEvent.blur(input)
    expect(input.value).toBe('mynewname')
    //})
})