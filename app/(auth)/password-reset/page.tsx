import PasswordResetForm from "./password-reset-form";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PasswordResetForm email={resolvedSearchParams?.email ?? ""} />
    </div>
  );
}
