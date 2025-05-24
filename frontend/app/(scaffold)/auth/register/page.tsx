"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { registerResolver, type RegisterSchema } from "../lib/schema";
import { isAuthError, register } from "../lib/action";
import { toast, ToastContainer } from "react-toastify";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import RegisterToast from "./components/register-toast";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: registerResolver,
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
      acceptTerms: false,
    }
  });

  const [isPending, startTransistion] = useTransition();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("Terjadi kesalahan, silahkan hubungi contact support kami.");

  const onSubmit = async (data: RegisterSchema) => {
    startTransistion(async () => {
      try {
        const response = await register(data);

        if (response.data) {
          toast.success(RegisterToast, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            data: {
              message: "Registrasi berhasil",
              submessage: "mengalihkan ke halaman login",
            }
          })

          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        }
      } catch (error) {
        setIsError(true);

        if (isAuthError(error)) {
          if (error.error.message == "User already exists") {
            return setErrorMessage("Username atau email sudah terdaftar");
          }

          // safely force the error to be an AuthError
          if (error.error.name == "UnexpectedError") {
            return setErrorMessage("Terjadi kesalahan, silahkan hubungi contact support kami.");
          }
        }
      }
    });
  }

  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full max-w-120 max-sm:max-w-11/12 mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Daftar <p className="inline-block text-primary">BacaCerdas</p></CardTitle>
            {
              isError && (
                <p className="text-sm text-red-500">
                  {errorMessage}
                </p>
              )
            }
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdullah Alex Jr." className="text-sm py-4.5" {...field} />
                  </FormControl>
                  <FormDescription>
                    {fieldState.error?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="alex123" className="text-sm py-4.5" {...field} />
                  </FormControl>
                  <FormDescription>
                    {fieldState.error?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="alex123@bacacerdas.ai" className="text-sm py-4.5" {...field} />
                  </FormControl>
                  <FormDescription>
                    {fieldState.error?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input type={isPasswordShown ? "text" : "password"} placeholder="Masukkan password" className="w-full text-sm py-4.5" {...field} />
                      <div
                        className="absolute right-2 cursor-pointer"
                        aria-label={isPasswordShown ? "Password is visibles" : "Password is hidden"}
                        role="button"
                        onClick={() => setIsPasswordShown((state) => !state)}
                      >
                        {
                          isPasswordShown ? <EyeClosed /> : <Eye />
                        }
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {formState.errors.password?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input type={isPasswordShown ? "text" : "password"} placeholder="Konfirmasi Password" className="w-full text-sm py-4.5" {...field} />
                      <div
                        className="absolute right-2 cursor-pointer"
                        aria-label={isPasswordShown ? "Password is visibles" : "Password is hidden"}
                        role="button"
                        onClick={() => setIsPasswordShown((state) => !state)}
                      >
                        {
                          isPasswordShown ? <EyeClosed /> : <Eye />
                        }
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {formState.errors.password?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Siswa</SelectItem>
                        <SelectItem value="TEACHER">Guru</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal gap-x-0.5">
                    <span>
                      Saya setuju dengan
                    </span>
                    <Link href="/terms-and-conditions" className="text-primary underline">
                      syarat dan ketentuan
                    </Link>
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-2 gap-y-2">
              <p className="text-sm w-full relative before:content-[''] before:block before:h-0.5 before:w-1/4 before:bg-muted before:absolute before:top-1/2 before:left-1/24 after:content-[''] after:block after:h-0.5 after:w-1/4 after:bg-muted after:absolute after:top-1/2 after:right-1/24 text-center">
                sudah punya akun?
              </p>
              <Button asChild className="text-xs" size="sm" variant="secondary">
                <Link href="/auth/login">
                  Masuk
                </Link>
              </Button>
            </div>

          </CardContent>

          <CardFooter className="justify-end">
            <Button className="w-10/12 max-w-30 py-5" disabled={isPending} type="submit">
              <LoaderCircle className={cn("animate-spin", isPending ? "inline-flex" : "hidden")} />
              Daftar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}