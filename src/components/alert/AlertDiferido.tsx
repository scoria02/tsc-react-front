import { Stack, Alert } from '@mui/material';

interface Props {
	disabled: boolean;
	msg: string;
}

export default function AlertDiferido({ disabled, msg }: Props) {
	return (
		<Stack sx={{ width: '50%' }} spacing={2}>
			<Alert severity={disabled ? 'success' : 'error'}>{disabled ? 'Verificado' : msg}</Alert>
		</Stack>
	);
}
