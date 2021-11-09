import ContentLoader from 'react-content-loader';

const LoadingCatalogCategoryPage = () => {
	return (
		<ContentLoader viewBox="0 0 820 450" height={450} width={820}>
			<rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
			<rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
			<rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
			<rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
			<rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
			<rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
		</ContentLoader>
	);
};

export default LoadingCatalogCategoryPage;
