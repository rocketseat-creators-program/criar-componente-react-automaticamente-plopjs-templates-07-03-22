import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPostPage from 'components/Loading/LoadingBlogPostPage';
import React, {ReactElement} from 'react';
import {DefaultLayout} from 'components/Layout/Default/Layout';
import {PostPageSeo} from 'pages/blog/post/_seo.config';

export interface BlogPostPageParams extends ParsedUrlQuery {
	postUrlKey: string;
}

export interface BlogPostPagePaths {
	params: BlogPostPageParams;
}

const topPostUrlKey: string[] = ['testing', 'bacon'];

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: BlogPostPagePaths[] = topPostUrlKey.map((postUrlKey: string) => ({
		params: {
			postUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {postUrlKey} = context.params as BlogPostPageParams;
	const revalidationTime = Number(process.env.NEXT_PUBLIC_DEFAULT_DATA_REVALIDATION_TIME);
	const post = topPostUrlKey.includes(postUrlKey); // get from API

	if (!post) return {notFound: true};

	return {
		props: {
			postUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const BlogPostPage = ({postUrlKey}: BlogPostPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingBlogPostPage />
	) : (
		<>
			<h1>Hello world!</h1>
			<p>Blog Post URL Key: {postUrlKey}</p>
			<PostPageSeo />
		</>
	);
};

BlogPostPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default BlogPostPage;
