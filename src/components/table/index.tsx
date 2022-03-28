import { DataGrid, GridColDef, GridRowData } from '@mui/x-data-grid';
import { FC, useEffect, useRef } from 'react';

interface TableProps {
	doubleClick: any;
	columns: GridColDef[];
	rows: GridRowData[];
}

const Table: FC<TableProps> = ({ doubleClick, columns, rows }) => {
	const fieldRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		fieldRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, [rows]);
	return (
		<div style={{ height: 500 }}>
			<DataGrid
				ref={fieldRef}
				columns={columns}
				rows={rows}
				rowsPerPageOptions={[25, 50, 100]}
				onCellDoubleClick={doubleClick}
			/>
		</div>
	);
};

export default Table;
