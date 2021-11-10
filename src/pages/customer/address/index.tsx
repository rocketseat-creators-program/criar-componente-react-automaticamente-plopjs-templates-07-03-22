import {AppLayout} from '@app/components/Layout/AppLayout';
import {CustomerAddressSeo} from '@app/pages/customer/address/CustomerAddressSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CustomerAddressPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the customer address page!</p>
			<CustomerAddressSeo />
		</>
	);
};

CustomerAddressPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAddressPage;
