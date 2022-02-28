
# **NextJs PWA E-commerce**: Progressive web application

STACK: [React](https://reactjs.org/docs/getting-started.html) | [Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) | [NextJS](https://nextjs.org/docs/getting-started) | [Mobx-State-Tree](https://mobx-state-tree.js.org/intro/welcome) | [SASS](https://sass-lang.com/documentation) | [BEM Syntax](http://getbem.com/introduction/) | [Jest](https://jestjs.io/docs/getting-started) | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | [Cypress](https://docs.cypress.io/)

This is a e-commerce app built with React with all the stack mentioned above. I used the best practices of the market. I'm being careful about performance and SEO all the time. So I suggest to check this documentation before start coding.

## **The PWA** (Progressive Web Application)

As you can see on the name, it’s a web app that uses [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), [manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest), and other web-platform features combined with [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) to give users an experience on par with native apps.

In short words, the user can install the web application as an app on their computer or can access it offline, and some [other advantages](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

It looks complex but React make it simple, and if you use the [next-pwa](https://github.com/shadowwalker/next-pwa) library, as this app is using, it will require almost zero-config to make it work well.

## **Running App Locally**

1. Clone repository
2. Install packages
	```
	$ yarn
	```
3. Run dev to develop and watch your changes. (It will auto compile when you save and you only need to refresh the browser)
	```
	$ yarn dev
	```
3. Access <http://localhost:3000/>
4. Let's Rock!
   
*P.S.: The PWA is disallowed for dev*

## **Running Production**

1. Run build
	```
	$ yarn build
	```

2. Run start
	```
	$ yarn start
	```

3. Access <http://localhost:3000/>

## **TDD** - Test-Driven Development
The development practice focused on creating test cases before developing the actual code, at really means developing using the baby steps technique and testing and “refactoring” every little progress.

- **WRITE** a “single” test describing an aspect of the program.
- **RUN** the test, which should fail because the program lacks that feature.
- **WRITE** “just enough” code, the simplest possible, just to make the test pass.
- **INCREMENT** / “refactor” the code keeping the simplicity criteria.
- **REPEAT** it, “accumulating” unit tests, until you achieve the program goal.

### **Folders Structure**
The component and function tests are located in their own directory to be found easily.

- The extension `.spec.ts|tsx` means it's a **CYPRESS** test.
- The extension `.test.ts|tsx` means it's a **JEST** test.

### **Testing PWA**

- Turn on/off the wifi and refresh the website page. You should be able to keep navigating on the pages you have already accessed.
- On the right side of the URL input on the browser or in the setting menu, you can find a link to install the app. Do it and open the PWA on your computer.

**IMPORTANT:** Always test the PWA after any change in the code the be sure everything still working fine.

## **NextJS**

NextJs has a file-system based router built on the [concept of pages](https://nextjs.org/docs/basic-features/pages).

A page is a [React Component](https://reactjs.org/docs/components-and-props.html) in the `src/pages` directory. Each page is associated with a route based on its file name. So, when a file is added to the `src/pages` directory with the extension `.page.tsx` it's automatically available as a route.

Always create a folder for each page and add an `index.page.tsx` because the SEO config file and styles also are stored together with the related `page/component` to make it easier to find it in the future.

Read more on NextJs official documentation:
- [Basic Features: Pages | Next.js](https://nextjs.org/docs/basic-features/pages)
- [Routing: Introduction | Next.js](https://nextjs.org/docs/routing/introduction)

### **Static Paths**
If you create `pages/about.page.tsx` that exports a React component like below, it will be accessible at `/about`.
The router supports nested files. If you create a nested folder structure files will be automatically routed in the same way still.
```
import {AppLayout} from '@app/components/Layout/AppLayout';
import {ContactsSeo} from '@app/pages/contacts/_seo.config';
import React, {ReactElement} from 'react';

const ContactsPage = () => {
	return (
		<>
			<p>Welcome to the contact page!</p>
			<ContactsSeo />
		</>
	);
};

ContactsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default ContactsPage;
```
`getLayout` is required for all pages. It's responsible for adding the header and footer. Go to the `src/layout` to check what layouts are available.

### **Dynamic Paths**
To match a dynamic segment you can use the bracket syntax. This allows you to match named parameters.
For example:
`pages/blog/[slug].tsx` → `/blog/:slug (/blog/hello-world)`
`pages/[username]/settings.tsx` → `/:username/settings` (`/foo/settings`)

```
import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCmsPage from '@app/components/Loading/LoadingCmsPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {CmsPagesSeo} from '@app/pages/cms/_seo.config';

export interface CmsPageParams extends ParsedUrlQuery {...}
export interface CmsPagePaths {...}

const topCmsUrlKey: string[] = ['testing', 'bacon'];

export const getStaticPaths: GetStaticPaths = async () => {...};

export const getStaticProps: GetStaticProps = async (context) => {
	const {cmsUrlKey} = context.params as CmsPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);
	const cmsPath = topCmsUrlKey.includes(cmsUrlKey); // get from API

	if (!cmsPath) return {notFound: true};

	return {
		props: {
			cmsUrlKey,
		},
		revalidate: revalidationTime,
	};
};

const CmsPage = ({cmsUrlKey}: CmsPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingCmsPage />
	) : (
		<>
			<p>CMS URL Key: {cmsUrlKey}</p>
			<CmsPagesSeo />
		</>
	);
};

CmsPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CmsPage;
```
### **Catch-All Routes: Multiple Nested Dynamic Paths**
Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets.
For example:
`pages/post/[...slug].tsx` matches `/post/a`, but also `/post/a/b`, `/post/a/b/c` and so on.

```
import {GetStaticPaths, GetStaticProps} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import LoadingCatalogCategoryPage from '@app/components/Loading/LoadingCatalogCategoryPage';
import React, {ReactElement} from 'react';
import {AppLayout} from '@app/components/Layout/AppLayout';
import {CatalogSeo} from '@app/pages/catalog/_seo.config';

export interface CatalogCategoryPageProps {...}
export interface CatalogCategoryPageParams extends ParsedUrlQuery {...}
export interface CatalogCategoryPagePaths {...}

const topCategoryUrlKey: string[] = ['testing', 'testing/bacon', 'testing/bacon/american'];

export const getStaticPaths: GetStaticPaths = async () => {...};

export const getStaticProps: GetStaticProps = async (context) => {
	const {urlKey} = context.params as CatalogCategoryPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DATA_REVALIDATION_TIME);
	const categoryPath = urlKey.toString().split(',').join('/');
	const category = topCategoryUrlKey.includes(categoryPath); // get from API

	if (!category) return {notFound: true};

	return {
		props: {
			category: urlKey[0],
			...(urlKey[1] && {subcategory: urlKey[1]}),
			...(urlKey[2] && {subsubcategory: urlKey[2]}),
		},
		revalidate: revalidationTime,
	};
};

const CatalogCategoryPage = ({category, subcategory, subsubcategory}: CatalogCategoryPageProps) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingCatalogCategoryPage />
	) : (
		<>
			<div>
				<p>Category URL Key: {category}</p>
				{subcategory && <p>Subcategory URL Key: {`${category}/${subcategory}`}</p>}
				{subsubcategory && (
					<p>Sub-subcategory URL Key: {`${category}/${subcategory}/${subsubcategory}`}</p>
				)}
			</div>
			<CatalogSeo />
		</>
	);
};

CatalogCategoryPage.getLayout = (page: ReactElement) => {
	return <AppLayout>{page}</AppLayout>;
};

export default CatalogCategoryPage;
```

### **Linking Pages**
The Next.js router allows you to do client-side route transitions between pages, similar to a single-page application.
A React component called Link is provided to do this client-side route transition.
```
import Link from 'next/link'
<Link href="/about">...</Link>
```

### **Linking to Dynamic Paths**
```
<Link href={`/blog/${encodeURIComponent(post.slug)}`}>...</Link>
```

### **Linking to Nested Dynamic Paths**
```
<Link href={`/catalog/${encodeURIComponent(category.slug)}/${encodeURIComponent(subcategory.slug)}`}>...</Link>
```

### **Testing Pages**
It's easy to messy with pages file and break the urls of que ecommerce, so you can test all the url (valid and invalid) using cypress.
```
yarn test:cypress
```
Alternatively you can use `yarn test:cypress-open` to watch the test running in the browser.

## **Mobile First**
It’s a mobile-first app. Please, develop for mobile and adapt to bigger screens.
How to develop for mobile-first: [Why you’ve got to start practicing mobile-first development](https://getflywheel.com/layout/start-practicing-mobile-first-development/)

## **Styles**
The app uses SASS superset of CSS to style the components and also uses BEM Syntax to keep the code clean and easy to read and maintain.

You have some default classes that you should use to set the font styles like size, weight, decoration and position. Check the default classes section to learn more about it.

Don't hesitate to ask for help if you have any questions about BEM Syntax. Finding the right name for the class could look tricky, but using it wrong could be worst than not using it.

### **Folder Structure**
Path: `src/styles`

- `base`: Where we keep the core configurations of styles and default classes.
Example: variables, breakpoints, colors, typography, containers, icons, alignments, browsers and containers.

- `exports`: Where we keep the CSS Modules. It’s used to export the SASS variables and use it on the JS, but as the BEM Syntax is a good alternative for it, you will rarely use it.

- `helpers`: Where we keep the SASS functions and mixins created to help with development and reduce the number of lines you need to write. You can find all the instructions about how to use it in the files.

- `pages`: DON'T USE IT
Where we keep the homepage style as NextJs don’t allow to relocate the index folder.

- `theme`: Where we keep the resets and styles specifics for the theme.

### **Pages & Components**
To make it easier to find the styles for each component we are keeping the styles related to every component or page in the related folder(outside the style folder).
_For example: When you create a new component in the src/components folder you should create your component folder, the index.tsx (your react component) and the _component-name.scss._
```
src
|- components
| |- YourComponent
| | |- index.tsx
| | |- _your-component.scss
```
"_" is used to denote partials. Underscore in front of the file name won't be generated into the compiled CSS unless you import it into another sass file.

### **Default Classes**
- `txt-left` | `txt-center` | `txt-right` 
- `theme-container`
- `txt-light` | `txt-regular` | `txt-bold` 
- `txt-italic`
- `txt-uppercase` | `txt-underline` | `txt-decoration-none` 
- `txt-xxs` | `txt-xs` | `txt-s` | `txt-m` | `txt-l` | `txt-xl` | `txt-xxl`: The font-size starting on `10px` increasing two-by-two until `32px`.

### **Breakpoints**
They are mixins that you can easily re-use.
- `small-screens`: max-width 480px
- `mobile`: min-width 480px
- `mobile-tablet`: min-width 480px and max-width 768px
- `tablet`: min-width 768px
- `tablet-laptop`: min-width 768px and max-width 992px
- `laptop`: min-width 992px
- `laptop-desktop`: min-width 992px and max-width 1200px
- `desktop`: min-width 1200px
- `desktop-big-screens`: min-width 1200px and max-width 1600px
- `big-screens`: min-width 1600px

### **Browser Mixins**
- **IE**: Internet Explorer
- **MS**: Microsoft Edge
- **IOS**: Any iOS device with touchable screen

### **Helpers**
Some mixins and functions to save time and reduce number of line to write.
- `rem($pixels)`: convert pixel to rem
- `flex($direction, $justify, $align, $wrap)`: If you would not like to set a property you can use "unset" as a value.
- `grid($row, $column, $gap)`: You MUST need to inform all values. The autoprefixer will automatically convert it to be frendly to you browsers list.
- `grid-child($row, $column)`: This mixin must be called only on elements that the parent has `display: grid`. The autoprefixer will automatically convert it to be frendly to you browsers list.
- `absolute($top, $right, $bottom, $left)`: If you would not like to set a property you can use "unset" as a value. Remember that you must use position: relative on the parent (or higher hierarchy) to make it works.
- `middle-image`: This mixin will positionate the image in the middle (vertical and horizontal) of the element. You must use `position: relative` on the parent and set the `width` and `height` of the parent. Use the `overflow: hidden` if the image is bigger than the parent element.
- `font-icon($family, $position, $icon-code, $top, $right, $bottom, $left)`: icons as pseudo elements

#### **Font-icon Mixin**
This mixin will help you to add any icon from fontawesome as pseudo element in any element.
usage: `@include font-icon() { ... set any custom property ... };`
Use \ before the icon-code.
If you will not set to the pseudo element an absolute position, you should set the last four values as "unset".
If you would not like to set any property related to absolute position you can use "unset"as a value.
The family value must be "fab | far | fas", you can find this info on the fontawesome website.
To accept different families you should go to `theme/YOUR_THEME/base/_icons.scss`.
To get the font codes and discover the family go to https://fontawesome.com/
If you are using attr() to set the icon, use the unicode glyph instead of icon code.
EXAMPLE:
```
@include font-icon('fas', 'before', '\f135', 0, unset, unset, 0) {
  font-size: 30px;
  color: $primary-colour;
}
```

### **Fonts**
We are using Fontawesome and Google fonts and all the setup is already done.
Related files: `src/styles/base/_icons.scss` and `src/styles/base/_typography.scss`

## **SSR - Server Side Rendering**
We use the Incremental Static Regeneration (ISR). So,  when we specify the `revalidate: 200` (200 is the default used by NextJs for eCommerce) in the getStaticProps function on the page it means that the app should check for data update after 200 seconds. Basically the step-by-step is like this:

1. The initial request to the product page will show the cached page with the cached data (Ex.: Price).
2. The data for the product is updated in the CMS.
3. Any requests to the page after the initial request and before 200 seconds are cached and instantaneous.
4. After the 200 seconds gap, the next request will still show the cached (stale) page. Next.js triggers a regeneration of the page in the background.
5. Once the page has been successfully generated, Next.js will invalidate the cache and show the updated product page. If the background regeneration fails, the old page remains unaltered.

The ISR is designed to persist your generated pages between deployments. This means that you’re able to roll back instantly and not lose your previously generated pages.

Each deployment can be keyed by an ID, which Next.js uses to persist statically generated pages. When you roll back, you can update the key to point to the previous deployment, allowing for atomic deployments. This means that you can visit your previous immutable deployments and they’ll work as intended.

You can have a full overview of this feature here:
- [A Complete Guide To Incremental Static Regeneration](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)
- [(ISR) With Next.js — Smashing Magazine](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)

Check the [NextJS documentation](https://nextjs.org/docs/basic-features/data-fetching) if you have any doubt.

### **Default Revalidate**
Product & Catalog Page: `60 sec`
Other Dynamic Pages: `200 sec`
You can change it on the `.env` file. Remember to restart your application every time when you change the environment file.

### **Pre-Cached Pages**
We use the `getStaticPaths` to set the pages that should be processed and cached while building. But to save building time, the app only does it for a specific range of pages that the BE provide to us in an array. The other pages not included in this array will be cached on the user's first access to the page. So, if no one accesses a page, we will never have the cached version of that page.

_For example: For the product pages we can cache while building the app only the top 100 products._

```
const topCmsUrlKey: string[] = ['testing', 'bacon']; // get from the API

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: CmsPagePaths[] = topCmsUrlKey.map((cmsUrlKey: string) => ({
		params: {
			cmsUrlKey,
		},
	}));
	return {
		paths,
		fallback: true,
	};
};
```
The `fallback: true` means that any path not generated during build time will not result in an automatic 404 page.

Next.js will serve the user a fallback version of the page, essentially a temporary page you create, while in the background Next.js generates the page. When the users attempt to visit a dynamic route that has not yet been generated, Next.js will generate that page, run `getStaticProp()` for it, and display the page to the user once it is generated. During the build process, a fallback version of the page is displayed to the user.

Once a page has been generated, it is put into the pool of all generated pages.

### **Handling Props & Data**
The `getStaticProps` is required as `getStaticPaths` function in the page component. It will handle props and data, and provide the props to the main component of the page.

Use it to fetch data during the build time.

```
export const getStaticProps: GetStaticProps = async (context) => {
	const {cmsUrlKey} = context.params as CmsPageParams;
	const revalidationTime: number = Number(process.env.REACT_APP_DEFAULT_DATA_REVALIDATION_TIME);
	const cmsPath = topCmsUrlKey.includes(cmsUrlKey); // get from API/check the url-key

    // If the the url-key is invalid display 404 page
	if (!cmsPath) return {notFound: true};

	return {
		props: {
			cmsUrlKey,
			// add here what you want to pass as a props
		},
		revalidate: revalidationTime,
	};
};
```
The revalidate is defined here.

### **Types & Interfaces**
Always add on top of the page just after the imports the Props instance for the `page/component`.
On the CMS page, used on the previous examples, the type will be like this:
```
export interface CmsPageParams extends ParsedUrlQuery {
	cmsUrlKey: string;
}

export interface CmsPagePaths {
	params: CmsPageParams;
}
```
**NEVER** use “I” (ICmsPages) on the name of the interfaces, be descriptive and use Props in the end if you are creating an interface for props or like in the example above, we used Params and Paths.

## **SEO - Search Engine Optimization**
To manage the SEO stuff like [meta tags](https://moz.com/blog/the-ultimate-guide-to-seo-meta-tags) and [schemas](https://snipcart.com/blog/schema-markup-ecommerce-website-seo) we are using the [next-seo](https://github.com/garmeeh/next-seo) library.

### **SEO Config**
Inside every page directory, you can find the `_seo.config.tsx` file. Inside this file, you can handle the meta title, meta description, canonical, open graph, Twitter tag and others.

You can set a default SEO config if you prefer: [GitHub - garmeeh/next-seo: Next SEO is a plug in that makes managing your SEO easier in Next.js projects](https://github.com/garmeeh/next-seo#default-seo-configuration)

For dynamic pages, of course, you should remember to fill the information in `<NextSeo />` component dynamically.

For example: `src/pages/product/ProductSeo.config.tsx`
```
import React from 'react';
import {NextSeo} from 'next-seo';

export const ProductSeo = () => {
	return (
		<NextSeo
			title="Product Name | BrandAlley"
			description="This example uses more of the available config options."
			openGraph={{
				url: 'https://www.url.ie/a',
				title: 'Open Graph Title',
				description: 'Open Graph Description',
				images: [
					{
						url: 'https://www.example.ie/og-image-01.jpg',
						width: 800,
						height: 600,
						alt: 'Og Image Alt',
						type: 'image/jpeg',
					},
					{
						url: 'https://www.example.ie/og-image-02.jpg',
						width: 900,
						height: 800,
						alt: 'Og Image Alt Second',
						type: 'image/jpeg',
					},
					{url: 'https://www.example.ie/og-image-03.jpg'},
					{url: 'https://www.example.ie/og-image-04.jpg'},
				],
				site_name: 'SiteName',
			}}
			twitter={{
				handle: '@handle',
				site: '@site',
				cardType: 'summary_large_image',
			}}
		/>
	);
};
```
And add the SEO config component to the page.
```
const ProductPage = ({productUrlKey}: ProductPageParams) => {
	const {isFallback} = useRouter();
	return isFallback ? (
		<LoadingProductPage />
	) : (
		<>
			<p>Product URL Key: {productUrlKey}</p>
			<ProductSeo /> // <---------------- Importing the Seo Config Component
		</>
	);
};
```

### **Schema**
Not done yet. If you want to do it: [GitHub - garmeeh/next-seo: Next SEO is a plug in that makes managing your SEO easier in Next.js projects](https://github.com/garmeeh/next-seo#json-ld)
