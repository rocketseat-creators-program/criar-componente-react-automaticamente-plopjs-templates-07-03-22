import {AppLayout} from '@app/components/Layout/AppLayout';
import {VouchersSeo} from '@app/pages/customer/vouchers/VouchersSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const VouchersPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the vouchers page!</p>
			<VouchersSeo />
		</>
	);
};

VouchersPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default VouchersPage;
