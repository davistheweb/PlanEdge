import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PlanEdge - Project Management & Team Collaboration" />
            <div className="min-h-screen bg-[#1e2939] text-white">
                <div className="relative flex min-h-screen flex-col selection:bg-emerald-500 selection:text-white">
                    <div className="relative mx-auto w-full max-w-7xl px-6">
                        <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-700 bg-gray-800/95 py-4 shadow-sm backdrop-blur-md lg:py-8">
                            {/* Logo and branding */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="/logo.png"
                                    alt="PlanEdge Logo"
                                    className="h-10 w-10 lg:h-12 lg:w-12"
                                    draggable={false}
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-white lg:text-2xl">
                                        PlanEdge
                                    </h1>
                                    <p className="hidden text-xs font-medium text-emerald-400 sm:block">
                                        Project Management
                                    </p>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden items-center gap-6 lg:flex">
                                <a
                                    href="https://github.com/davistheweb/PlanEdge"
                                    target="_blank"
                                    className="flex space-x-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                                >
                                    <span>Github</span>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-github-icon lucide-github"
                                        >
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                    </span>
                                </a>
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/login"
                                            className="px-4 py-2 text-white transition-colors hover:text-emerald-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </nav>

                            {/* Mobile Navigation */}
                            <div className="flex items-center gap-2 lg:hidden">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/register"
                                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        Sign Up
                                    </Link>
                                )}
                                <button
                                    onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                    className="p-2 text-white transition-colors hover:text-emerald-400"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {isMobileMenuOpen ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Menu */}
                            {isMobileMenuOpen && (
                                <div className="absolute top-[calc(4rem+0.5rem)] right-0 left-0 z-50 mx-6 mt-2 rounded-xl border border-gray-700 bg-gray-800/95 shadow-xl backdrop-blur-md lg:top-[calc(5rem+0.5rem)] lg:hidden">
                                    <div className="space-y-3 p-4">
                                        <a
                                            href="https://github.com/davistheweb/PlanEdge"
                                            target="_blank"
                                            className="flex space-x-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                                        >
                                            <span>Github</span>
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    className="lucide lucide-github-icon lucide-github"
                                                >
                                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                                </svg>
                                            </span>
                                        </a>
                                        {!auth.user && (
                                            <Link
                                                href="/login"
                                                className="block py-2 text-gray-300 transition-colors hover:text-white"
                                            >
                                                Log in
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </header>

                        {/* Backdrop for mobile menu */}
                        {isMobileMenuOpen && (
                            <div
                                className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        )}

                        <main className="flex-1 pt-16 lg:pt-20">
                            <div className="grid items-center gap-12 py-20 lg:grid-cols-2">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h2 className="text-5xl leading-tight font-bold text-white lg:text-6xl">
                                            Streamline Your
                                            <span className="text-emerald-400">
                                                {" "}
                                                Team Projects
                                            </span>
                                        </h2>
                                        <p className="text-xl leading-relaxed text-gray-300">
                                            Collaborate seamlessly, track
                                            progress effortlessly, and deliver
                                            projects on time with PlanEdge - the
                                            ultimate project management platform
                                            for modern teams.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        {!auth.user && (
                                            <>
                                                <Link
                                                    href="/register"
                                                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-emerald-700"
                                                >
                                                    Get Started
                                                </Link>
                                                <a
                                                    href="https://github.com/davistheweb/PlanEdge"
                                                    target="_blank"
                                                    className="inline-flex cursor-pointer items-center justify-center space-x-2 rounded-lg border border-gray-600 px-8 py-4 font-semibold text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
                                                >
                                                    <span>Github</span>
                                                    <span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            className="lucide lucide-github-icon lucide-github"
                                                        >
                                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                                        </svg>
                                                    </span>
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center lg:justify-end">
                                    <img
                                        src="/planedge.png"
                                        alt="PlanEdge - Project Management Platform"
                                        className="h-80 w-80 object-contain lg:h-96 lg:w-96"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            <div className="py-20">
                                <div className="mb-16 text-center">
                                    <h3 className="mb-4 text-3xl font-bold text-white">
                                        Everything you need to manage projects
                                    </h3>
                                    <p className="text-lg text-gray-300">
                                        Powerful features designed for teams
                                        that want to get things done
                                    </p>
                                </div>

                                <div className="grid gap-8 lg:grid-cols-3">
                                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition-colors hover:border-emerald-500/50">
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-600/20">
                                            <svg
                                                className="h-8 w-8 text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="mb-4 text-xl font-semibold text-white">
                                            Task Management
                                        </h4>
                                        <p className="text-gray-300">
                                            Create, assign, and track tasks with
                                            intuitive boards, lists, and
                                            timeline views. Keep everyone
                                            aligned on project progress.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition-colors hover:border-emerald-500/50">
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-600/20">
                                            <svg
                                                className="h-8 w-8 text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="mb-4 text-xl font-semibold text-white">
                                            Team Collaboration
                                        </h4>
                                        <p className="text-gray-300">
                                            Real-time collaboration with
                                            comments, file sharing, and team
                                            messaging. Work together seamlessly
                                            from anywhere.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition-colors hover:border-emerald-500/50">
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-600/20">
                                            <svg
                                                className="h-8 w-8 text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="mb-4 text-xl font-semibold text-white">
                                            Progress Tracking
                                        </h4>
                                        <p className="text-gray-300">
                                            Visual dashboards and reports to
                                            monitor project health, team
                                            performance, and deadline adherence
                                            at a glance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="border-t border-gray-700 py-8 text-center text-sm text-gray-400">
                            <p>
                                &copy; {new Date().getFullYear()} PlanEdge.
                                Built for teams.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
