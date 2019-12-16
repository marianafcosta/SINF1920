import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 12,
    position: 'relative',
    backgroundColor: '#FFFBA1',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 44px 5px 12px',
    fontFamily: 'Anaheim, sans-serif',
    '&:focus': {
      borderRadius: 12,
      borderColor: '#80bdff',
      backgroundColor: '#FFFBA1',
    },
  },
}))(InputBase);

export default BootstrapInput;
