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

export const handleLoadingSearch = () => {
	Swal.fire({
		title: 'Cargando...',
		showConfirmButton: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
		customClass: { container: 'swal2-validated' },
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleError = (error: any) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: error.response?.data?.message || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleComercioUpdated = () => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Comercio Actulizado',
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
	});
};
