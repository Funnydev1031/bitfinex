import { Provider } from "react-redux";
import store from "./store";
import { OrderBookModule } from "./module/orderBook";


function App() {
	return (
		<Provider store={store}>
			<OrderBookModule />
		</Provider>
	);
}

export default App;
