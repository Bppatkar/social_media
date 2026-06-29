import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/shared/Logo";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Logo />
      </div>

      <RegisterForm />
    </div>
  );
}
