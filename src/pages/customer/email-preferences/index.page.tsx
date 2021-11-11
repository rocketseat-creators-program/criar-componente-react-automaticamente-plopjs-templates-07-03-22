import {AppLayout} from '@app/components/Layout/AppLayout';
import {EmailPreferencesSeo} from '@app/pages/customer/email-preferences/_seo.config';
import React, {ReactElement} from 'react';

const EmailPreferencesPage = () => {
	return (
		<>
			<p>Welcome to the email preferences page!</p>
			<EmailPreferencesSeo />
		</>
	);
};

EmailPreferencesPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default EmailPreferencesPage;
