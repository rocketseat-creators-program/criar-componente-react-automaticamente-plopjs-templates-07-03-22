import {AppLayout} from 'components/Layout/AppLayout';
import {InvitationSeo} from 'pages/invitation/_seo.config';
import React, {ReactElement} from 'react';

const InvitationPage = () => {
	return (
		<>
			<p>Welcome to the invitation page!</p>
			<InvitationSeo />
		</>
	);
};

InvitationPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default InvitationPage;
