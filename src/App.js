import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LinkShortener from "./Components/LinkShortener";

const client = new ApolloClient({
  uri: "https://8opwz.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <LinkShortener />
      </div>
    </ApolloProvider>
  );
}
