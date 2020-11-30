import { MockedProvider } from '@apollo/client/testing'
import { Table } from './Table'
import {render as rtlRender} from '@testing-library/react'
import { ITEMS_QUERY } from './constants';

const gqlApiMocks = [
    {
        request: {
            query: ITEMS_QUERY,
            variables: {},
        },
        result: () => {
            return {
                data:{
                    headers:[
                        {header_id:2, header_name: 'col2' },
                        {header_id:1, header_name: 'col1'}
                    ], 
                    rows:[
                        {row_id:5},
                        {row_id:1}
                    ], 
                    values: [
                        {row_id: 5, header_id:2, value: 'val1'},
                        {row_id: 5, header_id:1, value: 'val2'},
                        {row_id: 1, header_id:2, value: 'val3'},
                        {row_id: 1, header_id:1, value: 'val4'},
                    ]
                }
            }
        }
    }
]
function render(apolloMock) {
    const {getByTestId, findByTestId, getByText, findByText, debug} = rtlRender(
        <MockedProvider mocks={apolloMock} addTypename={false}>
            <Table></Table>
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
test('should render all columns', async () => {
    const {findByText} = render(gqlApiMocks)
    expect(await findByText(/col1/i)).toBeInTheDocument() 
    expect(await findByText(/col2/i)).toBeInTheDocument() 
})
test('should render all cell rows', async () => {
    const {findByText} = render(gqlApiMocks)
    expect(await findByText(/val1/i)).toBeInTheDocument() 
    expect(await findByText(/val2/i)).toBeInTheDocument() 
    expect(await findByText(/val3/i)).toBeInTheDocument() 
    expect(await findByText(/val4/i)).toBeInTheDocument() 
})
