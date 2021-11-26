import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';
//import luffy from '../../../img/itachi2.png';
import luffy from '../../img/user.png';
import { useStylesModalUser } from './styles';
import './login/index.scss';

import './index.scss'

const AuthModal: React.FC<any> = ({children, name, register}) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className='ed-grid s-grid-1 m-grid-2 '>
					<div className={classes.containerLeft}>
						<CardMedia className={classes.media} image={luffy} title='Logo Mil Pagos' />
						<Button
							className={classes.buttonLeft}
							size='small'
							color='primary'
							variant='contained'
							onClick={() => history.push(`/auth/${!register ? 'register' : 'login'}`)}>
							<div className='ed-container'>
								<div className='s-to-center button-login'>{!register ? 'Registrarme ': 'Volver al Inicio'}</div>
							</div>
						</Button>
					</div>
					<CardContent>
						<div className='s-py-4'>
							<Typography gutterBottom variant='h5' component='h2' align='center' className={register ? '' : "toto"}>
								<b className={classes.titleRight}>{name}</b>
							</Typography>
						</div>
						<div>
							{children}
						</div>
					</CardContent>
				</div>
			</CardContent>
		</Card>
	);
};

export default AuthModal;
