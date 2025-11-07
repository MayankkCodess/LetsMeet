import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const withAuth = (WrappedComponent ) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("token")) {
                return true;
            } 
            return false;
        }

        useEffect(() => {
            if(!isAuthenticated()) {
                router("/auth")
            }
        }, [])

        return <WrappedComponent {...props} />
    }
  // this error below modified
    AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    return AuthComponent;
}

export default withAuth;