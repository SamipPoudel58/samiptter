import { Link } from 'react-router-dom';
import Head from '../components/Head';
import CustomToaster from '../components/CustomToaster';
import FullLogo from '../components/FullLogo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EmailConfrimationScreen = ({ match }) => {
  const dispatch = useDispatch();

  const emailConfirmation = useSelector((state) => state.confirmEmail);
  let { loading, error, success } = emailConfirmation;

  useEffect(() => {
    if (match.params && match.params.token) {
      dispatch(confirmEmail(match.params.token));
    }
  }, [dispatch, match.params.token]);

  return (
    <section className="authScreen">
      <Head title="Email Confirmation" />
      <CustomToaster />
      <div className="emailConfirmation">
        <div className="emailConfirmation__header">
          <FullLogo />
        </div>
        {loading && <Loader />}

        <div>
          <h1 className="emailConfirmation__icon">{error ? '😔' : '🎉'}</h1>
          <h1 className="emailConfirmation__heading">
            {error
              ? 'Email Confirmation Failed!'
              : 'Congrats! Your Email Has Been Confirmed.'}
          </h1>
          <div className="pt-2"></div>
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Link to="/login" className="emailConfirmation__redirectLink">
              Log In To Your Account &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmailConfrimationScreen;
