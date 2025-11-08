import AuthForm from '@/components/AuthForm'
export default function RegisterPage(){
  return (
    <main className="container mx-auto p-6">
      <AuthForm mode="register" />
      <p className="mt-4 text-center text-sm">
        ¿Ya tenés cuenta? <a className="underline" href="/login">Iniciar sesión</a>
      </p>
    </main>
  )
}