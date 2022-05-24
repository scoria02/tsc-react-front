import React, { useState } from 'react';
import { Avatar, Button, Container, List, ListItem, ListItemText } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { useStyles, sxStyled } from './styles';
import AnimatedModal from 'components/modals/AnimationModal';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface Props {
	url: string;
	modal: any;
	handleCloseModal: any;
}

const RenderCustomPdf: React.FC<Props> = ({ url, modal, handleCloseModal }) => {
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	const handlePagePdfBack = () => {
		if (pageNumber <= 1) setPageNumber(1);
		else setPageNumber(pageNumber - 1);
	};

	const handlePagePdfNext = () => {
		if (numPages - 1 >= pageNumber) setPageNumber(pageNumber + 1);
		else setPageNumber(1);
	};

	//console.log(numPages);
	//console.log('actual', pageNumber);

	const classes = useStyles();
	return (
		<AnimatedModal openModal={modal} handleCloseModal={handleCloseModal}>
			<Container className={classes.pdfModal}>
				<div className={classes.container_pdf}>
					<Button
						variant='contained'
						color='primary'
						onClick={handlePagePdfBack}
						disabled={pageNumber === 1 ? true : false}>
						Back
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={handlePagePdfNext}
						disabled={pageNumber >= numPages ? true : false}>
						Next
					</Button>
					<ListItem>
						<Button href={url} target='_blank' rel='noreferrer'>
							<Avatar>
								<PictureAsPdfIcon />
							</Avatar>
							<ListItemText primary={'--PDF'} sx={{ color: '#fff' }} />
						</Button>
					</ListItem>
				</div>
				<List className={classes.container_imgpdf}>
					<ListItem sx={sxStyled.imgcenter} value={url}>
						<Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
							<Page pageNumber={pageNumber} width={400} />
						</Document>
					</ListItem>
				</List>
			</Container>
		</AnimatedModal>
	);
};

export default RenderCustomPdf;
