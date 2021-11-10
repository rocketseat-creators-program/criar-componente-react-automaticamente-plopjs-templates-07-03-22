import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingProductPage from '@app/components/Loading/LoadingProductPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {ProductSeo} from '@app/pages/product/ProductSeo.config';

// Temporary, this will be deleted as soon as we have a store action doing it.
const getProduct = async (key: string) =>
	key !== 'testing' && key !== 'bacon' && key !== 'cheese' ? false : true;

export interface ProductPageParams extends ParsedUrlQuery {
	productUrlKey: string;
}

export interface ProductPagePaths {
	params: ProductPageParams;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topProductsUrlKey: string[] = await delay(5000, ['testing', 'bacon']);
	const paths: ProductPagePaths[] = topProductsUrlKey.map((productUrlKey: string) => ({
		params: {
			productUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {productUrlKey} = context.params as ProductPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DATA_REVALIDATION_TIME);
	const product = await getProduct(productUrlKey);

	if (!product) return {notFound: true};

	return {
		props: {
			productUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const ProductPage = ({productUrlKey}: ProductPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingProductPage />
	) : (
		<>
			<p>Product URL Key: {productUrlKey}</p>
			<ProductSeo />
		</>
	);
};

ProductPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

const delay = (delayInMs: number, toReturn: any): Promise<any> =>
	new Promise((resolve) => setTimeout(() => resolve(toReturn), delayInMs));

export default ProductPage;
