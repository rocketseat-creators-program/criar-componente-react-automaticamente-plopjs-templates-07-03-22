import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCmsPage from 'components/Loading/LoadingCmsPage';
import React, {ReactElement} from 'react';
import {DefaultLayout} from 'components/Layout/Default/Layout';
import {CmsPagesSeo} from 'pages/cms/_seo.config';

export interface CmsPageParams extends ParsedUrlQuery {
	cmsUrlKey: string;
}

export interface CmsPagePaths {
	params: CmsPageParams;
}

const topCmsUrlKey: string[] = ['testing', 'bacon'];

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: CmsPagePaths[] = topCmsUrlKey.map((cmsUrlKey: string) => ({
		params: {
			cmsUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {cmsUrlKey} = context.params as CmsPageParams;
	const revalidationTime = Number(process.env.NEXT_PUBLIC_DEFAULT_DATA_REVALIDATION_TIME);
	const cmsPath = topCmsUrlKey.includes(cmsUrlKey); // get from API

	if (!cmsPath) return {notFound: true};

	return {
		props: {
			cmsUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const CmsPage = ({cmsUrlKey}: CmsPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingCmsPage />
	) : (
		<>
			<h1>Hello world!</h1>
			<p>CMS URL Key: {cmsUrlKey}</p>
			<CmsPagesSeo />
		</>
	);
};

CmsPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default CmsPage;
