import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const notifySuccess = successMessage => toast.success(successMessage);
export const notifyWarning = warningMessage => toast.warning(warningMessage);
export const notifyInfo = infoMessage => toast.info(infoMessage);
export const notifyError = errorMessage => toast.error(errorMessage);
