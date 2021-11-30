import {DefaultLayout} from 'components/Layout/Default/Layout';
import {InvitationSeo} from 'pages/invitation/_seo.config';
import React, {ReactElement} from 'react';

const InvitationPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the invitation page!</p>
			<InvitationSeo />
		</>
	);
};

InvitationPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default InvitationPage;
