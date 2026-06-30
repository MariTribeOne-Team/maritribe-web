export function QaBackendError({
  title = "QA backend unavailable",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <main className="page-shell">
      <div className="wrap">
        <div className="panel">
          <h2>{title}</h2>
          <p>{message}</p>
          <p>
            Make sure the NestJS QA backend is running on <code>http://localhost:4010</code>.
          </p>
        </div>
      </div>
    </main>
  );
}
