export const socketMiddleware = (socket) => (params) => (next) => (action) => {
	const { dispatch, getState } = params;
	const { type } = action;

	switch (type) {
		case "socket/connect":
			socket.connect("wss://api-pub.bitfinex.com/ws/2");

			socket.on("open", () => {
				dispatch({ type: "socket/subscribe" });
			});
			socket.on("message", (message) => {
				const data = JSON.parse(message.data);
				const orderBookData = data[1];
				if (orderBookData) {
					if (Array.isArray(orderBookData[0])) {
					} else {
						if (orderBookData[1] === 0) {
							dispatch({
								type: "orderBook/removeData",
								payload: orderBookData,
							});
						} else {
							dispatch({
								type: "orderBook/updateData",
								payload: orderBookData,
							});
						}
					}
				}
			});
			socket.on("close", () => {});
			break;

		case "socket/disconnect":
			socket.disconnect();
			break;
		case "socket/subscribe":
			socket.send({
				channel: "book",
				event: "subscribe",
				freq: "F0",
				len: "100",
				prec: "P0",
				subId: "book/tBTCUSD/P0",
				symbol: "tBTCUSD",
			});
			break;

		default:
			break;
	}

	return next(action);
};
