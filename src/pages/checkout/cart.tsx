import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {useRouter} from 'next/router';
import {ReactElement} from 'react';

const CheckoutCartPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the checkout cart page!</p>;
};

CheckoutCartPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutCartPage;
