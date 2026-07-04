import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '@/features/follow/followApi';

export function useFollow() {
  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();

  const [unfollowUser, { isLoading: unfollowLoading }] =
    useUnfollowUserMutation();

  const toggleFollow = async (userId: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await unfollowUser(userId).unwrap();
      } else {
        await followUser(userId).unwrap();
      }
    } catch (error) {
      console.error(error);

      // Later
      // toast.error(getApiError(error));
    }
  };

  return {
    toggleFollow,
    isLoading: followLoading || unfollowLoading,
  };
}
