
import Router from "next/router";

import 'antd/dist/antd.css';
import MainLayout from '@themes';
import "@styles/nprogress.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';
import 'react-phone-input-2/lib/style.css';

// progress bars
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: true });
Router.onRouteChangeStart    = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError    = () => NProgress.done();

const App = ({ Component, pageProps }) => {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	)
}

export default App