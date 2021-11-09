import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {useRouter} from 'next/router';
import {ReactElement} from 'react';

const CheckoutSuccessPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the checkout success page!</p>;
};

CheckoutSuccessPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutSuccessPage;
