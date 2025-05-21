"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { loginResolver, LoginSchema } from "../lib/schema";
import { login } from "../lib/action";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {

  const form = useForm<LoginSchema>({
    resolver: loginResolver,
    defaultValues: {
      identifier: "",
      password: "",
      role: "STUDENT",
    }
  });

  const [isPending, startTransistion] = useTransition();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("code");

  const onSubmit = async (data: LoginSchema) => {
    startTransistion(async () => {
      await login(data);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Card className="w-full max-w-120 max-sm:max-w-11/12 mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Masuk ke <p className="inline-block text-primary">BacaCerdas</p></CardTitle>
              {
                error && (
                  <p className="text-sm text-red-500">
                    {error}
                  </p>
                )
              }
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Username/Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Gunakan username atau email" className="text-sm py-4.5" {...field} />
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

              <div className="flex flex-col items-center gap-2 gap-y-2">
                <Button className="text-xs" size="sm" variant="link"> Lupa pasword?</Button>
                <p className="text-sm w-full relative before:content-[''] before:block before:h-0.5 before:w-1/3 before:bg-muted before:absolute before:top-1/2 before:left-1/24 after:content-[''] after:block after:h-0.5 after:w-1/3 after:bg-muted after:absolute after:top-1/2 after:right-1/24 text-center">
                  atau
                </p>
                <Button className="text-xs" size="sm" variant="secondary">Buat akun</Button>
              </div>

            </CardContent>

            <CardFooter className="justify-end">
              <Button className="w-10/12 max-w-30 py-5" disabled={isPending} type="submit">
                <LoaderCircle className={cn("animate-spin", isPending ? "inline-flex" : "hidden")} />
                Masuk
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}