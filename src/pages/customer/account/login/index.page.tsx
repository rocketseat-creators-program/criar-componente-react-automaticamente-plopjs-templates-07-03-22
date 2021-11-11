import {AppLayout} from '@app/components/Layout/AppLayout';
import {AccountLoginSeo} from '@app/pages/customer/account/login/_seo.config';
import React, {ReactElement} from 'react';

const CustomerAccountLoginPage = () => {
	return (
		<>
			<p>Welcome to the customer account login page!</p>
			<AccountLoginSeo />
		</>
	);
};

CustomerAccountLoginPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountLoginPage;