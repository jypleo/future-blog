export default function AuthCodeError() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <p>There was an issue authenticating your user.</p>
    </div>
  )
}
