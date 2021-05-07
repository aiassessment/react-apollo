import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SlugInput from "./Components/SlugInput";

const client = new ApolloClient({
  uri: "https://8opwz.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SlugInput />
      </div>
    </ApolloProvider>
  );
}
