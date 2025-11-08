import AuthForm from '@/components/AuthForm'
export default function LoginPage(){
  return (
    <main className="container mx-auto p-6">
      <AuthForm mode="login" />
      <p className="mt-4 text-center text-sm">
        ¿No tenés cuenta? <a className="underline" href="/register">Crear cuenta</a>
      </p>
    </main>
  )
}