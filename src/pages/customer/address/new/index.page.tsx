import {AppLayout} from 'components/Layout/AppLayout';
import {NewCustomerAddressSeo} from 'pages/customer/address/new/_seo.config';
import React, {ReactElement} from 'react';

const NewCustomerAddressPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the new customer address page!</p>
			<NewCustomerAddressSeo />
		</>
	);
};

NewCustomerAddressPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default NewCustomerAddressPage;
