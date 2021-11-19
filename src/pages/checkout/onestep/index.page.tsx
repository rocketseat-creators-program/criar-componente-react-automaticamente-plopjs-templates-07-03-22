import {CheckoutLayout} from 'components/Layout/CheckoutLayout';
import {CheckoutOnestepSeo} from 'pages/checkout/onestep/_seo.config';
import React, {ReactElement} from 'react';

const CheckoutOnestepPage = () => {
	return (
		<>
			<p>Welcome to the checkout onestep page!</p>
			<CheckoutOnestepSeo />
		</>
	);
};

CheckoutOnestepPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutOnestepPage;
