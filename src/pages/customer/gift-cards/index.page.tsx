import {AppLayout} from 'components/Layout/AppLayout';
import {GiftCardsSeo} from 'pages/customer/gift-cards/_seo.config';
import React, {ReactElement} from 'react';

const GiftCardsPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the gift cards page!</p>
			<GiftCardsSeo />
		</>
	);
};

GiftCardsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default GiftCardsPage;
