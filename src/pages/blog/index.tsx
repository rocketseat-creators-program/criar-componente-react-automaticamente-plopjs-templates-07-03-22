import {AppLayout} from '@app/components/Layout/AppLayout';
import {BlogHomeSeo} from '@app/pages/blog/BlogHomeSeo.config';
import {useRouter} from 'next/router';
import React, {ReactElement} from 'react';

const BlogPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<p>Loading...</p>
	) : (
		<>
			<p>Welcome to the blog page!</p>
			<BlogHomeSeo />
		</>
	);
};

BlogPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default BlogPage;
