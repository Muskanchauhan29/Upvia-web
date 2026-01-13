import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-chart-2" /> Now in beta
          </div>
          <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            Your cute, modern <span className="bg-linear-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent">AI career coach</span>
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Analyze your resume, discover skill gaps, get role recommendations, prep interviews, and track applications — all in one calm workspace.
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/sign-in">Sign in to get started</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
        </div>

        {/* Glassmorphism preview panel */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-white/5">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 blur-3xl" />
            </div>
            <div className="relative p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="text-left">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">A calmer way to grow your career</h2>
                  <p className="mt-3 text-muted-foreground">Beautiful insights, role guidance, and application tracking in one place. Sign in to start analyzing your resume — no clutter, just clarity.</p>
                  <div className="mt-6">
                    <Button asChild size="lg">
                      <Link href="/sign-in">Sign in</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-xl">
                  <div className="aspect-16/10 w-full rounded-lg border border-white/10 bg-linear-to-br from-background to-background/60" />
                  <p className="mt-3 text-sm text-muted-foreground">Preview of your workspace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:shadow-2xl hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
              <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
            </div>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 ring-1 ring-white/15">🔍</div>
              <CardTitle className="text-base">Skill Gap Analysis</CardTitle>
              <CardDescription>Find strengths and gaps with actionable steps.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:shadow-2xl hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
              <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
            </div>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 ring-1 ring-white/15">🎯</div>
              <CardTitle className="text-base">Role Recommendations</CardTitle>
              <CardDescription>Match to roles aligned to your skills and goals.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:shadow-2xl hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
              <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
            </div>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 ring-1 ring-white/15">📌</div>
              <CardTitle className="text-base">Application Tracker</CardTitle>
              <CardDescription>Track applications and get smart reminders.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section id="how-it-works" className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-2 text-muted-foreground">Three simple steps to get clarity and momentum.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-chart-2/30 to-chart-1/30 text-xs font-semibold ring-1 ring-white/15">1</div>
                <CardTitle className="text-base">Sign in</CardTitle>
                <CardDescription>Create your workspace and sync preferences.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-chart-2/30 to-chart-1/30 text-xs font-semibold ring-1 ring-white/15">2</div>
                <CardTitle className="text-base">Add your resume</CardTitle>
                <CardDescription>Upload a PDF or paste text to analyze instantly.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-chart-2/30 to-chart-1/30 text-xs font-semibold ring-1 ring-white/15">3</div>
                <CardTitle className="text-base">Take action</CardTitle>
                <CardDescription>Get role matches, fill gaps, and track applications.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section id="pricing" className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Pricing</h2>
            <p className="mt-2 text-muted-foreground">Start free. Upgrade when you’re ready.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Get started with core features.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">$0</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Basic resume analysis</li>
                  <li>Limited role recommendations</li>
                  <li>Manual tracking</li>
                </ul>
                <div className="mt-6">
                  <Button variant="secondary" asChild>
                    <Link href="/sign-in">Get started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl ring-2 ring-transparent transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:shadow-2xl hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <div className="mb-2 inline-flex items-center gap-2">
                  <span className="rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 px-2 py-0.5 text-xs font-medium ring-1 ring-white/15">Most popular</span>
                </div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Everything you need to move faster.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">$9<span className="text-base font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Unlimited analyses</li>
                  <li>AI insights and gap plans</li>
                  <li>Smart application tracking</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/sign-in">Upgrade</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transform will-change-transform transition duration-200 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/20 hover:ring-2 hover:ring-chart-1/40 motion-reduce:transform-none">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden>
                <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/25 to-chart-1/25" />
              </div>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
                <CardDescription>For small teams and career centers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">$29<span className="text-base font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Shared workspaces</li>
                  <li>Team insights and reporting</li>
                  <li>Priority support</li>
                </ul>
                <div className="mt-6">
                  <Button variant="secondary" asChild>
                    <Link href="/sign-in">Contact sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
