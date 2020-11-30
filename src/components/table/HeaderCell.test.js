import { MockedProvider } from '@apollo/client/testing'
import { HeaderCell } from './HeaderCell'
import {render as rtlRender, fireEvent} from '@testing-library/react'

import { HEADER_NAME_UPDATE } from './constants';

const gqlApiMocks = [
    {
        request: {
            query: HEADER_NAME_UPDATE,
            variables: {header_id: 1, value: 'mynewname'},
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
                <thead>
                    <tr>
                        <HeaderCell key={key} 
                        header_id={header_id} 
                        row_id={row_id}
                        val={val} />
                    </tr>
                </thead>
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
    const initialValues = {header_id: 1, key: 1, val: 'test'}
    const {getByText} = render(gqlApiMocks, initialValues)
    expect(getByText(/test/i)).toBeInTheDocument() 
})
test('should render after change', async () => {
    const initialValues = {header_id: 1, key: 1, val: 'test'}
    //await act( async () => {
    const {getByTestId, findByTestId} = render(gqlApiMocks, initialValues)
    const comp = getByTestId("header-cell");
    fireEvent.click(comp)
    const input = await findByTestId("input-header-cell");
    fireEvent.change(input, {target: {value: 'mynewname'}})
    fireEvent.blur(input)
    expect(input.value).toBe('mynewname')
    //})
})