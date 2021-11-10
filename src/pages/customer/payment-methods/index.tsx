import {AppLayout} from '@app/components/Layout/AppLayout';
import {PaymentMethodsSeo} from '@app/pages/customer/payment-methods/PaymentMethodsSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const PaymentMethodsPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the payment methods page!</p>
			<PaymentMethodsSeo />
		</>
	);
};

PaymentMethodsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default PaymentMethodsPage;
