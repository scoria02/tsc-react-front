import { Socket } from 'socket.io-client';
import Swal from 'sweetalert2';

export const successValidationFM = async (idStatus: number, socket: Socket, setFm: any, setModelOpen: any) => {
	if (idStatus === 3) {
		socket.emit('cliente:loadAdministracionTodos');
	} else {
		socket.emit('cliente:loadDiferidos');
	}
	Swal.fire({
		icon: `${idStatus === 3 ? 'success' : 'warning'}`,
		title: `${idStatus === 3 ? 'Formulario Verificado' : 'Formulario Diferido'}`,
		customClass: { container: 'swal2-validated' },
		showConfirmButton: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
		timer: 1500,
	});
	socket.emit('cliente:disconnect');
	await setFm(null);
	await setModelOpen(false);
};
