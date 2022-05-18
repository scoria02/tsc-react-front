import Swal from 'sweetalert2';

export const errorFile = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
	const files = event.currentTarget.files;
	let error = false;
	Array.from(files!).forEach((file) => {
		let typeFile = file.name.split('.')[file.name.split('.').length - 1];
		if (typeFile !== 'pdf' && typeFile !== 'jpg' && typeFile !== 'jpeg' && typeFile !== 'png') {
			error = true;
			Swal.fire({
				icon: 'warning',
				title: 'Formato de archivo Invalido',
				text: `El archivo ${file.name} tiene un formato incorrecto`,
				customClass: { container: 'swal2-validated' },
				showConfirmButton: false,
				timer: 3500,
			});
		}
	});
	return error;
};
