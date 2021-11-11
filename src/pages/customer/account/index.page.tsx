import {AppLayout} from '@app/components/Layout/AppLayout';
import {AccountSeo} from '@app/pages/customer/account/_seo.config';
import React, {ReactElement} from 'react';

const CustomerAccountPage = () => {
	return (
		<>
			<p>Welcome to the customer accoutn page!</p>
			<AccountSeo />
		</>
	);
};

CustomerAccountPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountPage;
