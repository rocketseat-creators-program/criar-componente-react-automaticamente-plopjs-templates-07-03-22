import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCmsPage from '@app/components/Loading/LoadingCmsPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {CmsPagesSeo} from '@app/pages/cms/CmsPagesSeo.config';

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
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);
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
			<p>CMS URL Key: {cmsUrlKey}</p>
			<CmsPagesSeo />
		</>
	);
};

CmsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CmsPage;
