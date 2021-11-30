import {StoreProvider} from 'contexts/store.context';
import LanguageController from 'i18n/LanguageController';
import Link from 'next/link';
import React, {ReactNode} from 'react';

interface CheckoutLayoutProps {
	children: ReactNode;
}

export const CheckoutLayout = ({children}: CheckoutLayoutProps) => {
	return (
		<StoreProvider>
			<LanguageController>
				<div className="theme-container">
					<header>Checkout Header</header>
					<main>{children}</main>
					<footer>
						<Link href="/">{'<< Back Home <<'}</Link>
					</footer>
				</div>
			</LanguageController>
		</StoreProvider>
	);
};
