import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PaystackVerification = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const { isLoading, verifyPaystackPayment } = useContext(AppContext);

  const paystackVerification = async () => {
    verifyPaystackPayment(reference);
  };

  useEffect(() => {
    paystackVerification();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return <div>PaystackVerification</div>;
};

export default PaystackVerification;
