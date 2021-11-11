import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCatalogCategoryPage from '@app/components/Loading/LoadingCatalogCategoryPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {CatalogSeo} from '@app/pages/catalog/_seo.config';

export interface CatalogCategoryPageProps {
	category: string;
	subcategory: string;
	subsubcategory: string;
}

export interface CatalogCategoryPageParams extends ParsedUrlQuery {
	urlKey: string[];
}

export interface CatalogCategoryPagePaths {
	params: CatalogCategoryPageParams;
}

const topCategoryUrlKey: string[] = ['testing', 'testing/bacon', 'testing/bacon/american'];

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: CatalogCategoryPagePaths[] = topCategoryUrlKey.map((urlKey: string) => ({
		params: {
			urlKey: [urlKey],
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {urlKey} = context.params as CatalogCategoryPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DATA_REVALIDATION_TIME);
	const categoryPath = urlKey.toString().split(',').join('/');
	const category = topCategoryUrlKey.includes(categoryPath); // get from API

	if (!category) return {notFound: true};

	return {
		props: {
			category: urlKey[0],
			...(urlKey[1] && {subcategory: urlKey[1]}),
			...(urlKey[2] && {subsubcategory: urlKey[2]}),
		},
		revalidate: revalidationTime,
	};
};

const CatalogCategoryPage = ({category, subcategory, subsubcategory}: CatalogCategoryPageProps) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingCatalogCategoryPage />
	) : (
		<>
			<div>
				<p>Category URL Key: {category}</p>
				{subcategory && <p>Subcategory URL Key: {`${category}/${subcategory}`}</p>}
				{subsubcategory && (
					<p>Sub-subcategory URL Key: {`${category}/${subcategory}/${subsubcategory}`}</p>
				)}
			</div>
			<CatalogSeo />
		</>
	);
};

CatalogCategoryPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CatalogCategoryPage;
