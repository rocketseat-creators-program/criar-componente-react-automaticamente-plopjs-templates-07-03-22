import Link from 'next/link';
import {ReactElement, useState} from 'react';
import {ItemList} from '@app/components/ItemList/ItemList';
import {CheckoutLayout} from '@app/components/Layout/CheckoutLayout';

export interface Items {
	id: string;
	title: string;
}

const About = () => {
	const [itemsList] = useState<Items[]>([
		{id: 'lsdjhlaksdh', title: 'foo'},
		{id: 'sdfdsf', title: 'foo'},
		{id: 'Ddffl40', title: 'foo'},
		{id: 'rthrgbf', title: 'foo'},
	]);

	return (
		<>
			<p>ABOUT US TESTING!!!</p>
			<ItemList items={itemsList} />
			<Link href="/">{'<< Back'}</Link>
		</>
	);
};

About.getLayout = (page: ReactElement) => {
	return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default About;
