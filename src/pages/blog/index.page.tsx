import {DefaultLayout} from 'components/Layout/Default/Layout';
import {BlogHomeSeo} from 'pages/blog/_seo.config';
import React, {ReactElement} from 'react';

const BlogPage = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>Welcome to the blog page!</p>
			<BlogHomeSeo />
		</>
	);
};

BlogPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default BlogPage;
