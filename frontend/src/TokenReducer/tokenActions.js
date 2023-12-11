export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};

export const clearToken = () => {
    return {
        type: 'CLEAR_TOKEN',
    };
};