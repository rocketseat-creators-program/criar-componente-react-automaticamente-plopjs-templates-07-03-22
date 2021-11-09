import {AppLayout} from '@app/components/Layout/AppLayout';
import {useRouter} from 'next/router';
import {ReactElement} from 'react';

const BlogPage = () => {
	const {isFallback} = useRouter();
	return isFallback ? <p>Loading...</p> : <p>Welcome to the blog page!</p>;
};

BlogPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default BlogPage;
