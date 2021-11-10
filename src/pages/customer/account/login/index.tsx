import {AppLayout} from '@app/components/Layout/AppLayout';
import {AccountLoginSeo} from '@app/pages/customer/account/login/AccountLoginSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CustomerAccountLoginPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
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
