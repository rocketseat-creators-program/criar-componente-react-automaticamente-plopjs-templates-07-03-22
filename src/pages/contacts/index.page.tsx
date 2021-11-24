import {AppLayout} from 'components/Layout/AppLayout';
import {ContactsSeo} from 'pages/contacts/_seo.config';
import React, {ReactElement} from 'react';

const ContactsPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the contact page!</p>
			<ContactsSeo />
		</>
	);
};

ContactsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default ContactsPage;
