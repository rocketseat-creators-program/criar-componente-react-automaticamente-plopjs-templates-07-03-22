import {AppLayout} from '@app/components/Layout/AppLayout';
import {NewAccountSeo} from '@app/pages/customer/account/new/NewAccountSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const NewCustomerAccountPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the new customer accoutn page!</p>
			<NewAccountSeo />
		</>
	);
};

NewCustomerAccountPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default NewCustomerAccountPage;
