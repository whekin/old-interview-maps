import { connect } from 'react-redux';
import { push, pop } from '../redux/notifications';
import SignUpForm from '../components/SignUpForm';

const mapDispatchToProps = dispatch => ({
  push: el => dispatch(push(el)),
  pop: () => dispatch(pop())
});

export default connect(null, mapDispatchToProps)(SignUpForm);
