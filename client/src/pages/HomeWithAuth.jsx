import withAuth from '../utils/withAuth';
import Home from './Home.jsx';

const ProtectedHome = withAuth(Home);

export default ProtectedHome;
