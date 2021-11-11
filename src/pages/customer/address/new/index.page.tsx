import {AppLayout} from '@app/components/Layout/AppLayout';
import {NewCustomerAddressSeo} from '@app/pages/customer/address/new/_seo.config';
import React, {ReactElement} from 'react';

const NewCustomerAddressPage = () => {
	return (
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
