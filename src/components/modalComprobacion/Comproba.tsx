import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModal } from '../../store/actions/ui';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import './comprobar.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: 'relative',
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	})
);

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles2 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		button: {
			marginRight: theme.spacing(1),
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
	})
);

function getSteps() {
	return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return (
				<div className='comprobar_container'>
					<h1>GOLLA</h1>
				</div>
			);
		case 1:
			return 'Step 2: What is an ad group anyways?';
		case 2:
			return 'Step 3: This is the bit I really care about!';
		default:
			return 'Unknown step';
	}
}

export default function Comproba() {
	const classes2 = useStyles2();
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [skipped, setSkipped] = React.useState(new Set<number>());
	const steps = getSteps();

	const totalSteps = () => {
		return getSteps().length;
	};

	const isStepOptional = (step: number) => {
		return step === 1;
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
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

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !completed.has(i))
				: activeStep + 1;

		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = new Set(completed);
		newCompleted.add(activeStep);
		setCompleted(newCompleted);

		/**
		 * Sigh... it would be much nicer to replace the following if conditional with
		 * `if (!this.allStepsComplete())` however state is not set when we do this,
		 * thus we have to resort to not being very DRY.
		 */
		if (completed.size !== totalSteps() - skippedSteps()) {
			handleNext();
		}
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted(new Set<number>());
		setSkipped(new Set<number>());
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	function isStepComplete(step: number) {
		return completed.has(step);
	}

	//******************************************************* */
	const classes = useStyles();
	// const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);

	//   const handleOpen = () => {
	//     setOpen(true);
	//   };

	const handleClose = () => {
		// setOpen(false);
		dispatch(CloseModal());
	};

	return (
		<div>
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Sound
						</Typography>
						<Button autoFocus color='inherit' onClick={handleClose}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className={classes2.root}>
					<Stepper alternativeLabel nonLinear activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							const buttonProps: { optional?: React.ReactNode } = {};
							if (isStepOptional(index)) {
								buttonProps.optional = <Typography variant='caption'>Optional</Typography>;
							}
							if (isStepSkipped(index)) {
								stepProps.completed = false;
							}
							return (
								<Step key={label} {...stepProps}>
									<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
										{label}
									</StepButton>
								</Step>
							);
						})}
					</Stepper>
					<div>
						{allStepsCompleted() ? (
							<div>
								<Typography className={classes2.instructions}>
									All steps completed - you&apos;re finished2
								</Typography>
								<Button onClick={handleReset}>Reset</Button>
							</div>
						) : (
							<div>
								<Typography className={classes2.instructions}>{getStepContent(activeStep)}</Typography>
								<div>
									<Button disabled={activeStep === 0} onClick={handleBack} className={classes2.button}>
										Back
									</Button>
									<Button variant='contained' color='primary' onClick={handleNext} className={classes2.button}>
										Next
									</Button>
									{isStepOptional(activeStep) && !completed.has(activeStep) && (
										<Button variant='contained' color='primary' onClick={handleSkip} className={classes2.button}>
											Skip
										</Button>
									)}
									{activeStep !== steps.length &&
										(completed.has(activeStep) ? (
											<Typography variant='caption' className={classes2.completed}>
												Step {activeStep + 1} already completed
											</Typography>
										) : (
											<Button variant='contained' color='primary' onClick={handleComplete}>
												{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
											</Button>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
			</Dialog>
		</div>
	);
}

/*

const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);

	//   const handleOpen = () => {
	//     setOpen(true);
	//   };

	const handleClose = () => {
		// setOpen(false);
		dispatch(CloseModal());
	};
*/
