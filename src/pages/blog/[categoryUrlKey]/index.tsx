import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPage from '@app/components/Loading/LoadingBlogPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {BlogCategorySeo} from '@app/pages/blog/[categoryUrlKey]/BlogCategorySeo.config';

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
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);
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
