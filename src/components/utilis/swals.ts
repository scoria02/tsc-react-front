import Swal from 'sweetalert2';

export const handleLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Enviando Solicitud...',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		didOpen: () => {
			Swal.showLoading();
		},
	});
};
