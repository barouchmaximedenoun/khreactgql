import {makeStyles} from '@material-ui/core/styles';
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Table } from "./components/table/Table";

const useStyles = makeStyles(theme => {
  return {
    container: {
          width: '100%',
          height: '100vh',
          padding: '5px',
      },
  }
});
function App() {
 const classes = useStyles()
 return (
   <ApolloProvider client={client}>
     <div data-testid="table-container" 
          className={classes.container}
          style={{ padding: "5px" }}>
        <Table></Table>
      </div>
   </ApolloProvider>
 );
}

export default App;
