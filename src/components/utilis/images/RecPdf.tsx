import { Avatar, Button, List, ListItem, ListItemText } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Rec from './Rec';

import { useStyles } from '../../Admision/comprobacion/pasosComprobacion/styles/styles';

const sxStyled = {
	imgcenter: {
		marginTop: '3rem',
		justifyContent: 'center',
	},
};

const RecPdf: React.FC<any> = ({ load, setLoad, imagen }) => {
	const url = imagen;

	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	console.log(numPages);
	console.log('actual', pageNumber);

	const handlePagePdfBack = () => {
		if (pageNumber <= 1) setPageNumber(1);
		else setPageNumber(pageNumber - 1);
	};

	const handlePagePdfNext = () => {
		if (numPages - 1 >= pageNumber) setPageNumber(pageNumber + 1);
		else setPageNumber(1);
	};

	const classes = useStyles();
	return (
		<>
			{imagen.split('.')[imagen.split('.').length - 1] === 'pdf' ? (
				<>
					<Button
						variant='contained'
						color='secondary'
						onClick={handlePagePdfBack}
						disabled={pageNumber === 1 ? true : false}>
						Back
					</Button>
					<Button
						variant='contained'
						color='secondary'
						onClick={handlePagePdfNext}
						disabled={pageNumber >= numPages ? true : false}>
						Next
					</Button>
					<List className={classes.container_imgpdf}>
						<ListItem sx={sxStyled.imgcenter} value={imagen}>
							<Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
								<Page pageNumber={pageNumber} />
							</Document>
						</ListItem>
					</List>
				</>
			) : (
				<Rec load={load} setLoad={setLoad} imagen={imagen} />
			)}
		</>
	);
};

export default RecPdf;
