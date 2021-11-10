import {AppLayout} from '@app/components/Layout/AppLayout';
import React, {ReactElement} from 'react';

const InvitationPage = () => {
	return <p>Welcome to the invitation page!</p>;
};

InvitationPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default InvitationPage;
