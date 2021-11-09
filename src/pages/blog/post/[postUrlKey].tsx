import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPostPage from '@app/components/Loading/LoadingBlogPostPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';

export interface BlogPostPageParams extends ParsedUrlQuery {
	postUrlKey: string;
}

export interface BlogPostPagePaths {
	params: BlogPostPageParams;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topPostUrlKey: string[] = ['testing', 'bacon'];
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
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);

	return {
		props: {
			postUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const BlogPostPage = ({postUrlKey}: BlogPostPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? <LoadingBlogPostPage /> : <p>Blog Post URL Key: {postUrlKey}</p>;
};

BlogPostPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default BlogPostPage;
