/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { stepComplete } from '../../../store/actions/accept';
import { cleanAdmisionFM, updateStatusFM } from '../../../store/actions/admisionFm';
import { CloseModalDiferido } from '../../../store/actions/ui';
import FullModal from '../../modals/FullModal';


import StepDiferido from './StepDiferido';


const useStyles2 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			margin: '1.5rem',
			padding: '1rem',
		},
		button: {
			marginRight: theme.spacing(1),
			textTransform: 'none',
		},
		backButton: {
			marginRight: theme.spacing(1),
		},
		completed: {
			display: 'inline-block',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		cancelIcon: {
			fontSize: '3rem',
			position: 'fixed',
			right: '2rem',
			top: '1rem',
			color: theme.palette.secondary.main,
			zIndex: 10,
			cursor: 'pointer',
			'&:hover': {
				color: theme.palette.secondary.light,
			},
		},
		containerStep: {
			marginTop: theme.spacing(2),
		},
		buttonS: {
			textTransform: 'none',
		},
	})
);

const Diferido: React.FC<any> = ({ fm }) => {
	const dispatch = useDispatch();

	const { modalOpenDiferido } = useSelector((state: any) => state.ui);

	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [skipped, setSkipped] = React.useState(new Set<number>());

	const steps = getSteps();

	function getSteps() {
		let list: string[] = [];
		list = [
			'xxx'
		]
		//valids
		return list ;
	}

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return (
					<div>
						<StepDiferido 
							fm={fm}
						/>
					</div>
				);
			default:
				return 'Invalid step';
		}
	}

	const totalSteps = () => {
		return getSteps().length;
	};
	const skippedSteps = () => {
		return skipped.size;
	};

	const completedSteps = () => {
		return completed.size;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps() - skippedSteps();
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};


	function isStepComplete(step: number) {
		return completed.has(step);
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !completed.has(i)) : activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const validStatusFm = (): boolean => {
		//validar la new imagen
		return true;
	};

	const handleClose = () => {
		dispatch(CloseModalDiferido());
	};

	const handleComplete = async () => {
		const newCompleted = new Set(completed);
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				newCompleted.add(activeStep);
				dispatch(stepComplete(newCompleted));
				setCompleted(newCompleted);
				if (completed.size !== totalSteps() - skippedSteps()) {
					handleNext();
				}
			}
		});
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	return (
		<FullModal 
			stepComplete={stepComplete}
			clean={cleanAdmisionFM}
			updatedStatus={updateStatusFM}
			CloseModal={CloseModalDiferido}
			steps={steps}
			getStepContent={getStepContent}
			fm={fm}
			modalOpen={modalOpenDiferido}
			id_status={0}
			getSteps={getSteps}
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			completed={completed}
			setCompleted={setCompleted}
			skipped={skipped}
		/>
	)
};

export default Diferido;
