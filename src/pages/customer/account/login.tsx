import {AppLayout} from '@app/components/Layout/AppLayout';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CustomerAccountLoginPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the customer account login page!</p>;
};

CustomerAccountLoginPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CustomerAccountLoginPage;
