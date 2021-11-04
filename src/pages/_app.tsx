import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';

import '@app/styles/main.scss';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp = ({Component, pageProps}: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page); // Use the layout defined at the page level, if available
	return getLayout(<Component {...pageProps} />);
};

export default MyApp;
