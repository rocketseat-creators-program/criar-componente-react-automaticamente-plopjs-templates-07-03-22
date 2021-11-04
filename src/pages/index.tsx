import type {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import Link from 'next/link';

const Page = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<Link href="/about">About Page</Link>
		</>
	);
};

Page.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default Page;
