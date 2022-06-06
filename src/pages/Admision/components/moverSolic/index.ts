import { Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import { handleLoadingSearch } from 'utils/handleSwal';

const handleErrorMover = (op: number, socket: Socket, user: any, data: any, setIdFm: any) => {
	Swal.fire({
		icon: 'error',
		text: data.err.message,
		showCancelButton: false,
		showConfirmButton: true,
	}).then((result) => {
		if (result.isConfirmed) {
			console.log('open');
			handleMover(op, socket, user, setIdFm);
		}
	});
};

const handleMover = (op: number, socket: Socket, user: any, setIdFm: any) => {
	const text = op === 2 ? 'Ej: V123456' : 'Ej: S000XC00XX00X';
	const socketText = op === 2 ? 'cliente:buscarSolicXCommerce' : 'cliente:buscarSolic';
	Swal.fire({
		icon: 'question',
		input: 'text',
		html: `<p>Buscar Solicitud por <b>${op === 1 ? 'Rif' : 'Codigo de Solicitud'}</b></p>`,
		inputAttributes: {
			autocapitalize: 'off',
		},
		inputPlaceholder: text,
		showCancelButton: false,
		confirmButtonText: 'Buscar solicitud',
		//showLoaderOnConfirm: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Atras',
		showCloseButton: true,
		customClass: { container: 'swal2-validated' },
	}).then(async (result: any) => {
		console.log('res', result.value);
		if (result.isConfirmed) {
			if (result.value !== '') {
				console.log(result.value);
				const value = {
					user,
					key: result.value.trim(),
				};
				socket.emit(socketText, value, (data: any) => {
					console.log('data', data);
					if (data.ok && data.solic.id) {
						console.log('open this id solic', data.solic.id);
						handleLoadingSearch();
						setIdFm(data.solic.id);
					} else {
						handleErrorMover(op, socket, user, data, setIdFm);
					}
				});
			} else {
				Swal.fire({
					icon: 'error',
					text: 'Error campo vacio',
				});
			}
		}
	});
};

export default async function moveSolic(socket: Socket, user: any, setIdFm: any) {
	const list = {
		1: 'Codigo de Solicitud',
		2: 'Rif del Comercio',
	};
	Swal.fire({
		icon: 'question',
		title: `Buscar solicitud por:`,
		input: 'select',
		inputOptions: list,
		//inputValue: term.status,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Buscar',
		showCancelButton: false,
	}).then((result) => {
		if (result.value > 0 && result.value < 3) {
			handleMover(Number(result.value), socket, user, setIdFm);
		}
	});
}
