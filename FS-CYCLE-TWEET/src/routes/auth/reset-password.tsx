import { ResetPasswordForm } from '../../features/auth/auth-reset/component/reset-password-form';
import { AuthLayout } from '../../component/layout/app-auth-layout';

export default function ResetPasswordRoute() {
  return (
    <AuthLayout title="Reset password">
      <ResetPasswordForm token={''} />
    </AuthLayout>
  );
}
