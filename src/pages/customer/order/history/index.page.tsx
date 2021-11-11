import {AppLayout} from '@app/components/Layout/AppLayout';
import {OrderHistorySeo} from '@app/pages/customer/order/history/_seo.config';
import React, {ReactElement} from 'react';

const CustomerOrderHistoryPage = () => {
	return (
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
