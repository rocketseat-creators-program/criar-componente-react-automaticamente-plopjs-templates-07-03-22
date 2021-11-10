import {AppLayout} from '@app/components/Layout/AppLayout';
import {EmailPreferencesSeo} from '@app/pages/customer/email-preferences/EmailPreferencesSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const EmailPreferencesPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
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
