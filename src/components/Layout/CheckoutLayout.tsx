import Link from 'next/link';
import React, {ReactNode} from 'react';

interface CheckoutLayoutProps {
	children: ReactNode;
}

export const CheckoutLayout = ({children}: CheckoutLayoutProps) => {
	return (
		<div className="theme-container">
			<header>Checkout Header</header>
			<main>{children}</main>
			<footer>
				<Link href="/">{'<< Back Home <<'}</Link>
			</footer>
		</div>
	);
};
