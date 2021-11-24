import {AppLayout} from 'components/Layout/AppLayout';
import {AccountSeo} from 'pages/customer/account/_seo.config';
import React, {ReactElement} from 'react';

const CustomerAccountPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the customer accoutn page!</p>
			<AccountSeo />
		</>
	);
};

CustomerAccountPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountPage;
