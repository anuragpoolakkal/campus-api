import mongoose from 'mongoose';

const handleError = (res, error) => {
    return res.status(error.status ?? 500).json({ message: error.message, success: false });
};
export { handleError };