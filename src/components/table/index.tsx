import {
	DataGrid,
	GridColDef,
	GridRowData,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { FC, useEffect, useRef } from 'react';

interface TableProps {
	doubleClick: any;
	columns: GridColDef[];
	rows: GridRowData[];
	getRowId: any;
}

const Table: FC<TableProps> = ({ doubleClick, columns, rows, getRowId }) => {
	const fieldRef = useRef<HTMLInputElement>(null);
	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	useEffect(() => {
		fieldRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, [rows]);

	return (
		<div style={{ height: 500 }}>
			<DataGrid
				components={{
					Toolbar: customToolbar,
				}}
				//ref={fieldRef}
				columns={columns}
				getRowId={getRowId}
				rows={rows}
				rowsPerPageOptions={[25, 50, 100]}
				onCellDoubleClick={doubleClick}
			/>
		</div>
	);
};

export default Table;
