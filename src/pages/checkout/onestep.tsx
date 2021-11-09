import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';
import {useRouter} from 'next/router';
import {ReactElement} from 'react';

const CheckoutOnestepPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the checkout onestep page!</p>;
};

CheckoutOnestepPage.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default CheckoutOnestepPage;
