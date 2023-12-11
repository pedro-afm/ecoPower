import { useSelector } from "react-redux";

const useAuth = () => {
    const token = useSelector((state) => state.token.token);

    return {
        token,
    };
};

export default useAuth;
