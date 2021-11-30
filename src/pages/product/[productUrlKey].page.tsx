import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingProductPage from 'components/Loading/LoadingProductPage';
import React, {ReactElement} from 'react';
import {DefaultLayout} from 'components/Layout/Default/Layout';
import {ProductSeo} from 'pages/product/_seo.config';

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
	const revalidationTime = Number(process.env.NEXT_PUBLIC_DATA_REVALIDATION_TIME);
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
			<h1>Hello world!</h1>
			<p>Product URL Key: {productUrlKey}</p>
			<ProductSeo />
		</>
	);
};

ProductPage.getLayout = (page: ReactElement) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};

const delay = (delayInMs: number, toReturn: string[]): Promise<string[]> =>
	new Promise((resolve) => setTimeout(() => resolve(toReturn), delayInMs));

export default ProductPage;
