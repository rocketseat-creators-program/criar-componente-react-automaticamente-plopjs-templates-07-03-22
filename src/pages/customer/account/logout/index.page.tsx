import {AppLayout} from 'components/Layout/AppLayout';
import {AccountLogoutSeo} from 'pages/customer/account/logout/_seo.config';
import React, {ReactElement} from 'react';

const CustomerAccountLogoutPage = () => {
	return (
		<>
			<p>Welcome to the customer account logout page!</p>
			<AccountLogoutSeo />
		</>
	);
};

CustomerAccountLogoutPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountLogoutPage;
