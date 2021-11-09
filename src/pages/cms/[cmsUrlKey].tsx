import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCmsPage from '@app/components/Loading/LoadingCmsPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';

export interface CmsPageParams extends ParsedUrlQuery {
	cmsUrlKey: string;
}

export interface CmsPagePaths {
	params: CmsPageParams;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topCmsUrlKey: string[] = ['testing', 'bacon'];
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

	return {
		props: {
			cmsUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const CmsPage = ({cmsUrlKey}: CmsPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? <LoadingCmsPage /> : <p>CMS URL Key: {cmsUrlKey}</p>;
};

CmsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CmsPage;
