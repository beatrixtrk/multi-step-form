import { Ubuntu } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
	title: 'Multi Step Form',
	description: 'Frontend Mentor',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={`${ubuntu.className} bg-backgroundBlue`}>
				{children}
			</body>
		</html>
	);
}
