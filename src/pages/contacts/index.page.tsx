import {DefaultLayout} from 'components/Layout/Default/Layout';
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
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default ContactsPage;
