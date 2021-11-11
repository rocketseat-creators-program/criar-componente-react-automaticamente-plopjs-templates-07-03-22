import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {CheckoutSuccessSeo} from '@app/pages/checkout/success/_seo.config';
import React, {ReactElement} from 'react';

const CheckoutSuccessPage = () => {
	return (
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
