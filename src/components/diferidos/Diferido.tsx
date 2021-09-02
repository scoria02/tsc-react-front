import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
	id: 'name' | 'code' | 'population';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
		id: 'population',
		label: 'Population',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
];

interface Data {
	name: string;
	code: string;
	population: number;
}

function createData(name: string, code: string, population: number): Data {
	return { name, code, population };
}

const rows = [
	createData('India', 'IN', 1324171354),
	createData('China', 'CN', 1403500365),
	createData('Italy', 'IT', 60483973),
	createData('United States', 'US', 327167434),
	createData('Canada', 'CA', 37602103),
	createData('Australia', 'AU', 25475400),
	createData('Germany', 'DE', 83019200),
	createData('Ireland', 'IE', 4857000),
	createData('Mexico', 'MX', 126577691),
	createData('Japan', 'JP', 126317000),
	createData('France', 'FR', 67022000),
	createData('United Kingdom', 'GB', 67545757),
	createData('Russia', 'RU', 146793744),
	createData('Nigeria', 'NG', 200962417),
	createData('Brazil', 'BR', 210147125),
];

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
});

const Diferido = () => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// const handleRow = (e: any) => {
	// 	console.log(e.target.children);
	// };

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{/* <h1 className='titulo'>Difiredos</h1> */}
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							const handleRow = () => {
								console.log(row.name, row.code, row.population);
							};
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.code} onClick={handleRow}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
												// onClick={(event: any) => handleData(column, event)}
											>
												{column.format && typeof value === 'number' ? column.format(value) : value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Diferido;
