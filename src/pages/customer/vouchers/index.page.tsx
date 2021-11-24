import {AppLayout} from 'components/Layout/AppLayout';
import {VouchersSeo} from 'pages/customer/vouchers/_seo.config';
import React, {ReactElement} from 'react';

const VouchersPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the vouchers page!</p>
			<VouchersSeo />
		</>
	);
};

VouchersPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default VouchersPage;
