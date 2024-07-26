"use client"

import { ChangeEvent, useState } from "react";
import Input from "../(components)/input";
import Button from "../(components)/button";
import { login } from "../lib";

import { useCookies } from 'next-client-cookies';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function BasicExample(): JSX.Element {
  const cookies = useCookies();
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setForm(prev => ({...prev, [name]: value}))
  }

  async function onSubmit() {
    try {
      const oneDay = 24 * 60 * 60 * 1000
      const expires = new Date(Date.now() + oneDay);

      const token = await login(form)

      cookies.set('token', token.token, { expires })

      router.push('/')
    } catch (error: any) {
      const message = error?.cause?.status === 404? 'Usuário ou senha errado!' : 'Ocorreu um erro inesperado!'
      console.log('err',error)
      toast.error(message)
    }
  }

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-start gap-20 p-10">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 max-w-96">
            <div>

              <div className="flex flex-col">
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Email address"
                    className="mb-6 h-10 grow p-2 border-black border-2 rounded focus:border-primary outline-none transition-colors"
                    onChange={handleChange}
                />

                <Input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    className="mb-6 h-10 grow p-2 border-black border-2 rounded focus:border-primary outline-none transition-colors"
                    onChange={handleChange}
                />
              </div>

              <div className="text-center">
                  <Button 
                    label="LOGIN" 
                    onClick={onSubmit}
                  />

                {/* <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}