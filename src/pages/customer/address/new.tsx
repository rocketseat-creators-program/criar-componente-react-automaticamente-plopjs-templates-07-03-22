import {AppLayout} from '@app/components/Layout/AppLayout';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const NewCustomerAddressPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the new customer address page!</p>;
};

NewCustomerAddressPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default NewCustomerAddressPage;
