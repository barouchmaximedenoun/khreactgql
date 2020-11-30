import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Table } from "./components/table/Table";

function App() {
 return (
   <ApolloProvider client={client}>
     <div data-testid="table-container" style={{ padding: "5px" }}>
        <Table></Table>
      </div>
   </ApolloProvider>
 );
}

export default App;
