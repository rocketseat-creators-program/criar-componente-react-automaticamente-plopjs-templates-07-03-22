import {AppLayout} from '@app/components/Layout/AppLayout';
import {AccountLogoutSeo} from '@app/pages/customer/account/logout/AccountLogoutSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CustomerAccountLogoutPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
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
