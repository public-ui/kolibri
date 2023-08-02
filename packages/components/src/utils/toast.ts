import { Toast, ToasterService } from '../components/toast/toaster';
import { KoliBri } from './dev.utils';

const toasterService = KoliBri?.Toaster as ToasterService;
export const toast = (toast: Toast) => toasterService?.enqueue(toast);
