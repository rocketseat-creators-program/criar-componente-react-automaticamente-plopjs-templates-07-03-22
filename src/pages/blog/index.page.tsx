import {AppLayout} from 'components/Layout/AppLayout';
import {BlogHomeSeo} from 'pages/blog/_seo.config';
import React, {ReactElement} from 'react';

const BlogPage = () => {
	return (
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
