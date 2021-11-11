import {AppLayout} from '@app/components/Layout/AppLayout';
import {GiftCardsSeo} from '@app/pages/customer/gift-cards/_seo.config';
import React, {ReactElement} from 'react';

const GiftCardsPage = () => {
	return (
		<>
			<p>Welcome to the gift cards page!</p>
			<GiftCardsSeo />
		</>
	);
};

GiftCardsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default GiftCardsPage;
