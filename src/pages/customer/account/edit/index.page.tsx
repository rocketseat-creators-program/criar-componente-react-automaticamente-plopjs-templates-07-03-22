import {DefaultLayout} from 'components/Layout/Default/Layout';
import {EditAccountSeo} from 'pages/customer/account/edit/_seo.config';
import React, {ReactElement} from 'react';

const EditCustomerAccountPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the edit customer accoutn page!</p>
			<EditAccountSeo />
		</>
	);
};

EditCustomerAccountPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditCustomerAccountPage;
