import {DefaultLayout} from 'components/Layout/Default/Layout';
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
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default NewCustomerAddressPage;
