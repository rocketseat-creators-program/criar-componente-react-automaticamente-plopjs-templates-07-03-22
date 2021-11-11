import {AppLayout} from '@app/components/Layout/AppLayout';
import {EditAccountSeo} from '@app/pages/customer/account/edit/_seo.config';
import React, {ReactElement} from 'react';

const EditCustomerAccountPage = () => {
	return (
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
