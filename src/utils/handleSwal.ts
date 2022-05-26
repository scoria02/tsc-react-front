import Swal from 'sweetalert2';
import './swal.scss';

export const handleLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Verificando',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleError = (error: any) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: error.response?.data?.message || 'Error access',
		customClass: { container: 'swal2-validated' },
		timer: 2500,
	});
};
