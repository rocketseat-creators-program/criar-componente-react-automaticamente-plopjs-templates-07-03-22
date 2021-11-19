import Link from 'next/link';
import React from 'react';

export const PagesList = () => {
	return (
		<div>
			<h2>To Test Paths</h2>
			<h3>Static Paths</h3>
			<ul>
				<li>
					<Link href="/invitation">Invitation Page</Link>
				</li>
				<li>
					<Link href="/contacts">Contacts Page</Link>
				</li>
				<li>
					<Link href="/customer/account">Customer Account Page</Link>
				</li>
				<li>
					<Link href="/customer/account/edit">Customer Account Edit Page</Link>
				</li>
				<li>
					<Link href="/customer/account/login">Customer Account Login Page</Link>
				</li>
				<li>
					<Link href="/customer/account/logout">Customer Account Logout Page</Link>
				</li>
				<li>
					<Link href="/customer/account/new">Customer Account New Page</Link>
				</li>
				<li>
					<Link href="/customer/address">Customer Address Page</Link>
				</li>
				<li>
					<Link href="/customer/address/new">Customer Address New Page</Link>
				</li>
				<li>
					<Link href="/customer/order/history">Customer Order History Page</Link>
				</li>
				<li>
					<Link href="/customer/email-preferences">Customer Email Preferences Page</Link>
				</li>
				<li>
					<Link href="/customer/gift-cards">Customer Gift Cards Page</Link>
				</li>
				<li>
					<Link href="/customer/payment-methods">Customer Payment Methods Page</Link>
				</li>
				<li>
					<Link href="/customer/vouchers">Customer Vouchers Page</Link>
				</li>
				<li>
					<Link href="/checkout/cart">Checkout Cart Page</Link>
				</li>
				<li>
					<Link href="/checkout/onestep">Checkout Onestep Page</Link>
				</li>
				<li>
					<Link href="/checkout/success">Checkout Success Page</Link>
				</li>
				<li>
					<Link href="/blog">Blog Page</Link>
				</li>
			</ul>
			<h3>Dynamic Paths</h3>
			<h4>Pre-cached Paths</h4>
			<ul>
				<li>
					<Link href={`/product/${encodeURIComponent('testing')}`}>Product Testing Page</Link>
				</li>
				<li>
					<Link href={`/product/${encodeURIComponent('bacon')}`}>Product Bacon Page</Link>
				</li>
				<li>
					<Link href={`/cms/${encodeURIComponent('testing')}`}>CMS Testing Page</Link>
				</li>
				<li>
					<Link href={`/cms/${encodeURIComponent('bacon')}`}>CMS Bacon Page</Link>
				</li>
				<li>
					<Link href={`/catalog/${encodeURIComponent('testing')}`}>Catalog Testing Page</Link>
				</li>
				<li>
					<Link href={`/catalog/${encodeURIComponent('testing')}/${encodeURIComponent('bacon')}`}>
						Catalog Testing - Bacon Page
					</Link>
				</li>
				<li>
					<Link
						href={`
							/catalog/${encodeURIComponent('testing')}
							/${encodeURIComponent('bacon')}
							/${encodeURIComponent('american')}
						`}>
						Catalog Testing - Bacon - American Page
					</Link>
				</li>
				<li>
					<Link href={`/blog/tag/${encodeURIComponent('testing')}`}>Blog Tag Testing Page</Link>
				</li>
				<li>
					<Link href={`/blog/post/${encodeURIComponent('testing')}`}>Blog Post Testing Page</Link>
				</li>
				<li>
					<Link href={`/blog/${encodeURIComponent('testing')}`}>Blog Category Testing Page</Link>
				</li>
			</ul>
			<h4>{'Valid & Not Pre-cached Path'}</h4>
			<ul>
				<li>
					<Link href={`/product/${encodeURIComponent('cheese')}`}>Product Cheese Page</Link>
				</li>
			</ul>
			{/* <h4>Invalid Paths</h4>
			<ul>
				<li>
					<Link href={`/product/${encodeURIComponent('any')}`}>Product Any Page</Link>
				</li>
				<li>
					<Link href={`/cms/${encodeURIComponent('any')}`}>CMS Any Page</Link>
				</li>
				<li>
					<Link href={`/catalog/${encodeURIComponent('any')}`}>Catalog Any Page</Link>
				</li>
				<li>
					<Link href={`/catalog/${encodeURIComponent('testing')}/${encodeURIComponent('any')}`}>
						Catalog Testing - Any Page
					</Link>
				</li>
				<li>
					<Link href={`/catalog/${encodeURIComponent('any')}/${encodeURIComponent('any')}`}>
						Catalog Any - Any Page
					</Link>
				</li>
				<li>
					<Link
						href={`
							/catalog/${encodeURIComponent('testing')}
							/${encodeURIComponent('bacon')}
							/${encodeURIComponent('any')}
						`}>
						Catalog Testing - Bacon - Any Page
					</Link>
				</li>
				<li>
					<Link
						href={`
							/catalog/${encodeURIComponent('any/')}
							/${encodeURIComponent('any')}
							/${encodeURIComponent('any')}
						`}>
						Catalog Any - Any - Any Page
					</Link>
				</li>
				<li>
					<Link href={`/blog/tag/${encodeURIComponent('any')}`}>Blog Tag Any Page</Link>
				</li>
				<li>
					<Link href={`/blog/post/${encodeURIComponent('any')}`}>Blog Post Any Page</Link>
				</li>
				<li>
					<Link href={`/blog/${encodeURIComponent('any')}`}>Blog Category Any Page</Link>
				</li>
			</ul> */}
		</div>
	);
};
