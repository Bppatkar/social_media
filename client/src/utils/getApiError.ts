export function getApiError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const err = error as {
      data?: { message?: string };
    };
    return err.data?.message ?? 'An unknown error occurred.';
  }
  return 'Something went wrong. Please try again later.';
}
