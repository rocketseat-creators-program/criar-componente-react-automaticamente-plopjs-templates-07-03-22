import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPage from '@app/components/Loading/LoadingBlogPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';

export interface BlogTagPageParams extends ParsedUrlQuery {
	tagUrlKey: string;
}

export interface BlogTagPagePaths {
	params: BlogTagPageParams;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topTagUrlKey: string[] = ['testing', 'bacon'];
	const paths: BlogTagPagePaths[] = topTagUrlKey.map((tagUrlKey: string) => ({
		params: {
			tagUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {tagUrlKey} = context.params as BlogTagPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);

	return {
		props: {
			tagUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const BlogTagPage = ({tagUrlKey}: BlogTagPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? <LoadingBlogPage /> : <p>Blog Tag URL Key: {tagUrlKey}</p>;
};

BlogTagPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default BlogTagPage;
