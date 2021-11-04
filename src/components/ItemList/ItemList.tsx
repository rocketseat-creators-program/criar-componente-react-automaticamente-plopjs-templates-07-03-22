import {Items} from '@app/pages/about';
import colors from '@app/styles/exports/colors.module.scss';

interface ItemListProps {
	items: Items[];
	background?: string;
}

export const ItemList = ({items}: ItemListProps) => {
	return (
		<ul className="item-list">
			{items.map(({id, title}) => (
				<li className="item-list__item" key={id} style={{color: colors.error}}>
					{title}
				</li>
			))}
		</ul>
	);
};
