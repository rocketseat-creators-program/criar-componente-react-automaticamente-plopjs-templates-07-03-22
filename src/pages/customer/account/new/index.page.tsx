import {DefaultLayout} from 'components/Layout/Default/Layout';
import {NewAccountSeo} from 'pages/customer/account/new/_seo.config';
import React, {ReactElement} from 'react';

const NewCustomerAccountPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the new customer accoutn page!</p>
			<NewAccountSeo />
		</>
	);
};

NewCustomerAccountPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default NewCustomerAccountPage;
