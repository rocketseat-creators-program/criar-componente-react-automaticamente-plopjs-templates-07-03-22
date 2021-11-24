import {AppLayout} from 'components/Layout/AppLayout';
import {OrderHistorySeo} from 'pages/customer/order/history/_seo.config';
import React, {ReactElement} from 'react';

const CustomerOrderHistoryPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the customer order history page!</p>
			<OrderHistorySeo />
		</>
	);
};

CustomerOrderHistoryPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerOrderHistoryPage;
