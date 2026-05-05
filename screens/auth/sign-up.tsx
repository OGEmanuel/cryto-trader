import AuthForm from './components/form';
import PageWrapper from './components/page-wrapper';

const SignUp = () => {
  return (
    <PageWrapper title="Sign up">
      <AuthForm page="Sign up" />
    </PageWrapper>
  );
};

export default SignUp;
