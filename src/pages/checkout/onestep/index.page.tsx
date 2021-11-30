import {CheckoutLayout} from 'components/Layout/Checkout/Layout';
import {CheckoutOnestepSeo} from 'pages/checkout/onestep/_seo.config';
import React, {ReactElement} from 'react';

const CheckoutOnestepPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the checkout onestep page!</p>
			<CheckoutOnestepSeo />
		</>
	);
};

CheckoutOnestepPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutOnestepPage;
