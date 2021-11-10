import {AppLayout} from '@app/components/Layout/AppLayout';
import {NewCustomerAddressSeo} from '@app/pages/customer/address/new/NewCustomerAddressSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const NewCustomerAddressPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the new customer address page!</p>
			<NewCustomerAddressSeo />
		</>
	);
};

NewCustomerAddressPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default NewCustomerAddressPage;
