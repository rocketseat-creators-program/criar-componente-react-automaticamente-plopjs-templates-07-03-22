import {AppLayout} from '@app/components/Layout/AppLayout';
import {ContactsSeo} from '@app/pages/contacts/_seo.config';
import React, {ReactElement} from 'react';

const ContactsPage = () => {
	return (
		<>
			<p>Welcome to the contact page!</p>
			<ContactsSeo />
		</>
	);
};

ContactsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default ContactsPage;
