import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const OrderBookModule = () => {
	const dispatch = useDispatch();
	const { orderBookData } = useSelector((state) => state.orderBook);

	useEffect(() => {
		return () => {
			dispatch({ type: "socket/disconnect" });
		};
	}, []);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row gap-5">
				<button onClick={() => dispatch({ type: "socket/connect" })}>
					Connect
				</button>
				<button onClick={() => dispatch({ type: "socket/disconnect" })}>
					DisConnect
				</button>
			</div>
			<div className="flex flex-row gap-5">
				<div className="w-1/2 flex flex-col items-end">
					<table class="items-center bg-transparent w-full border-collapse ">
						<thead>
							<tr>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Count
								</th>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Amount
								</th>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Price
								</th>
							</tr>
						</thead>

						<tbody>
							{[...orderBookData?.bid]
								?.sort((a, b) => b[0] - a[0])
								.map((acc, index) => {
									return (
										<tr key={index}>
											<th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
												{acc[1]}
											</th>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
												{acc[2]}
											</td>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
												{acc[0]}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				<div className="w-1/2 flex flex-col items-start ">
					<table class="items-center bg-transparent w-full border-collapse ">
						<thead>
							<tr>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Price
								</th>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Amount
								</th>
								<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Count
								</th>
							</tr>
						</thead>

						<tbody>
							{[...orderBookData?.ask]
								?.sort((a, b) => a[0] - b[0])
								.map((acc, index) => {
									return (
										<tr key={index}>
											<th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
												{acc[0]}
											</th>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
												{Math.abs(acc[2])}
											</td>
											<td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
												{acc[1]}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
