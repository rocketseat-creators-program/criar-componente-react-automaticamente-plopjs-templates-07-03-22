import {CheckoutLayout} from 'components/Layout/CheckoutLayout';
import {CheckoutCartSeo} from 'pages/checkout/cart/_seo.config';
import React, {ReactElement} from 'react';

const CheckoutCartPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the checkout cart page!</p>
			<CheckoutCartSeo />
		</>
	);
};

CheckoutCartPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutCartPage;
