import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {CheckoutCartSeo} from '@app/pages/checkout/cart/CheckoutCartSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CheckoutCartPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the checkout cart page!</p>
			<CheckoutCartSeo />
		</>
	);
};

CheckoutCartPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutCartPage;
