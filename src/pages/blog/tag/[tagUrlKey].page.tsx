import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingBlogPage from 'components/Loading/LoadingBlogPage';
import React, {ReactElement} from 'react';
import {DefaultLayout} from 'components/Layout/Default/Layout';
import {TagPageSeo} from 'pages/blog/tag/_seo.config';

export interface BlogTagPageParams extends ParsedUrlQuery {
	tagUrlKey: string;
}

export interface BlogTagPagePaths {
	params: BlogTagPageParams;
}

const topTagUrlKey: string[] = ['testing', 'bacon'];

export const getStaticPaths: GetStaticPaths = async () => {
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
	const revalidationTime = Number(process.env.NEXT_PUBLIC_DEFAULT_DATA_REVALIDATION_TIME);
	const tag = topTagUrlKey.includes(tagUrlKey); // get from API

	if (!tag) return {notFound: true};

	return {
		props: {
			tagUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const BlogTagPage = ({tagUrlKey}: BlogTagPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingBlogPage />
	) : (
		<>
			<h1>Hello world!</h1>
			<p>Blog Tag URL Key: {tagUrlKey}</p>
			<TagPageSeo />
		</>
	);
};

BlogTagPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default BlogTagPage;
