import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {CheckoutOnestepSeo} from '@app/pages/checkout/onestep/CheckoutOnestepSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const CheckoutOnestepPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
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
