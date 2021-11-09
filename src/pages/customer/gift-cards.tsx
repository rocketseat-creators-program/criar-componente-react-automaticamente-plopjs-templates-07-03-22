import {AppLayout} from '@app/components/Layout/AppLayout';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const GiftCardsPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the gift cards page!</p>;
};

GiftCardsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default GiftCardsPage;
