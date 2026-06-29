import LoginForm from '@/components/forms/LoginForm';
import Logo from '@/components/shared/Logo';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Logo />
      </div>

      <LoginForm />
    </div>
  );
}
