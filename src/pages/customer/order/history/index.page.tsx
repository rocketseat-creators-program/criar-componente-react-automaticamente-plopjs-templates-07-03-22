import {DefaultLayout} from 'components/Layout/Default/Layout';
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
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default CustomerOrderHistoryPage;
