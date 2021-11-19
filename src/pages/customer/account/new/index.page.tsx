import {AppLayout} from 'components/Layout/AppLayout';
import {NewAccountSeo} from 'pages/customer/account/new/_seo.config';
import React, {ReactElement} from 'react';

const NewCustomerAccountPage = () => {
	return (
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
