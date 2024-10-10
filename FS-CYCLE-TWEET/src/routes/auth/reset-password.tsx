import { ResetPasswordForm } from '../../features/auth/auth-reset/component/reset-password-form';
import { AuthLayout } from '../../component/layout/app-auth-layout';
import { useParams } from 'react-router-dom';

export default function ResetPasswordRoute() {
  const { token } = useParams();
  return (
    <AuthLayout title="Reset password">
      <ResetPasswordForm token={token || ''} />
    </AuthLayout>
  );
}
