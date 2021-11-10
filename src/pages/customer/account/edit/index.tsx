import {AppLayout} from '@app/components/Layout/AppLayout';
import {EditAccountSeo} from '@app/pages/customer/account/edit/EditAccountSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const EditCustomerAccountPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the edit customer accoutn page!</p>
			<EditAccountSeo />
		</>
	);
};

EditCustomerAccountPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default EditCustomerAccountPage;
