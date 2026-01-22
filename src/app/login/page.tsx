'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { GalleryVerticalEnd, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError('Credenciais inválidas.');
                console.error("Login failed:", error.message);
            } else {
                console.log("Login success");
                window.location.href = '/admin/leads';
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Erro de conexão.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a
                            href="/"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-10 items-center justify-center rounded-md ">
                                <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva" className="size-6 opacity-80" />
                            </div>
                            <span className="sr-only">Primitiva</span>
                        </a>
                        <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nome@primitiva.cc"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 focus:border-zinc-700 text-white"
                            required
                        />
                    </Field>
                    <Field>
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 focus:border-zinc-700 text-white"
                            required
                        />
                    </Field>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md text-center font-mono">
                            {error}
                        </div>
                    )}
                    <Field>
                        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Field>

                </FieldGroup>
            </form>
        </div>
    )
}

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Initializing...</div>;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-4 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
