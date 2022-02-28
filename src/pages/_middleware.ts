import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
	const { pathname } = req.nextUrl;
	if (pathname == '/cms/about-us') {
		return NextResponse.redirect('/about-us', 301);
	}
	return NextResponse.next();
};
