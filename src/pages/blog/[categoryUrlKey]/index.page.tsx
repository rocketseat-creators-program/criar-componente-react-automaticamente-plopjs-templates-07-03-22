import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPage from 'components/Loading/LoadingBlogPage';
import React, {ReactElement} from 'react';
import {AppLayout} from 'components/Layout/AppLayout';
import {BlogCategorySeo} from 'pages/blog/[categoryUrlKey]/_seo.config';

export interface BlogCategoryPageParams extends ParsedUrlQuery {
	categoryUrlKey: string;
}

export interface BlogCategoryPagePaths {
	params: BlogCategoryPageParams;
}

const topCateforyUrlKey: string[] = ['testing', 'bacon'];

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: BlogCategoryPagePaths[] = topCateforyUrlKey.map((categoryUrlKey: string) => ({
		params: {
			categoryUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {categoryUrlKey} = context.params as BlogCategoryPageParams;
	const revalidationTime = Number(process.env.NEXT_PUBLIC_DEFAULT_DATA_REVALIDATION_TIME);
	const category = topCateforyUrlKey.includes(categoryUrlKey); // get from API

	if (!category) return {notFound: true};

	return {
		props: {
			categoryUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const BlogCategoryPage = ({categoryUrlKey}: BlogCategoryPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingBlogPage />
	) : (
		<>
			<p>Blog Category URL Key: {categoryUrlKey}</p>
			<BlogCategorySeo />
		</>
	);
};

BlogCategoryPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default BlogCategoryPage;
