import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/features/auth/authSelectors';

export default function useCurrentUser() {
  const user = useAppSelector(selectUser);

  return {
    user,
  };
}
