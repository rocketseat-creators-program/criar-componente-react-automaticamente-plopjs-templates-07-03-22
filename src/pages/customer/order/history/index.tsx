import {AppLayout} from '@app/components/Layout/AppLayout';
import {OrderHistorySeo} from '@app/pages/customer/order/history/OrderHistorySeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CustomerOrderHistoryPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the customer order history page!</p>
			<OrderHistorySeo />
		</>
	);
};

CustomerOrderHistoryPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerOrderHistoryPage;
