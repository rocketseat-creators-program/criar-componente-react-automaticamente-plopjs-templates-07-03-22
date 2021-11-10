import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {CheckoutSuccessSeo} from '@app/pages/checkout/success/CheckoutSuccessSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CheckoutSuccessPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the checkout success page!</p>
			<CheckoutSuccessSeo />
		</>
	);
};

CheckoutSuccessPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutSuccessPage;
