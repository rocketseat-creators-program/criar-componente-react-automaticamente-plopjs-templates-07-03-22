import {DefaultLayout} from 'components/Layout/Default/Layout';
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
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default GiftCardsPage;
