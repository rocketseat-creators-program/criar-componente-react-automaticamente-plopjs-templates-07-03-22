import {AppLayout} from '@app/components/Layout/AppLayout';
import React, {ReactElement} from 'react';

const CustomerAccountPage = () => {
	return <p>Welcome to the customer accoutn page!</p>;
};

CustomerAccountPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountPage;
