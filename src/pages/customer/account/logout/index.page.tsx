import {DefaultLayout} from 'components/Layout/Default/Layout';
import {AccountLogoutSeo} from 'pages/customer/account/logout/_seo.config';
import React, {ReactElement} from 'react';

const CustomerAccountLogoutPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the customer account logout page!</p>
			<AccountLogoutSeo />
		</>
	);
};

CustomerAccountLogoutPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default CustomerAccountLogoutPage;
