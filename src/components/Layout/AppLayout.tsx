import Link from 'next/link';
import React, {ReactNode} from 'react';

interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout = ({children}: AppLayoutProps) => {
	return (
		<div className="theme-container">
			<header className="txt-center txt-xxl txt-bold txt-uppercase">Static Header</header>
			<main>{children}</main>
			<footer>
				<Link href="/">{'<< Back Home <<'}</Link>
			</footer>
		</div>
	);
};
