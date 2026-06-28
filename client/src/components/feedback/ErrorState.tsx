type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({
  message = 'Something went wrong.',
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-sm text-destructive">
      {message}
    </div>
  );
}
