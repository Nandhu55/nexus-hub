'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, ArrowRight, Library, FileText, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export default function LandingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const features = [
      {
        icon: Library,
        title: 'Extensive Library',
        description: 'Access a vast collection of academic books, notes, and resources for every subject.',
      },
      {
        icon: FileText,
        title: 'Exam Papers',
        description: 'Prepare for your exams with a large repository of previous year question papers.',
      },
      {
        icon: Bot,
        title: 'Career Guidance',
        description: 'Find career advice, resume tips, and interview preparation resources.',
      },
    ];

    const faqItems = [
      {
        question: 'What is B-Tech Hub?',
        answer: 'B-Tech Hub is a comprehensive e-library and resource platform designed specifically for B.Tech students. It provides access to academic books, question papers, AI-powered study tools, and career guidance resources all in one place.',
      },
      {
        question: 'Is there a mobile app available?',
        answer: 'Currently, B-Tech Hub is fully responsive and accessible through any modern web browser on your phone or tablet. A dedicated mobile app is on our roadmap for future development.',
      },
      {
        question: 'How can I contribute?',
        answer: 'We welcome contributions of academic materials like notes or question papers. Please use the contact form or email us at gnreddy255@gmail.com to get in touch with our team about how you can help expand our library.',
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we take data security very seriously. All user data is handled with strict privacy controls, and we use modern encryption standards to protect your information. Your academic progress and personal details are kept confidential.',
      }
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <BookMarked className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                        <span className="font-headline text-2xl font-bold text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                            B-Tech Hub
                        </span>
                    </Link>
                    <div className="ml-auto flex items-center gap-2">
                         <ThemeToggle />
                        <Button asChild>
                            <Link href="/login">
                                <span>Get Started</span>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24 lg:py-32">
                    <div 
                        className={`space-y-6 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                            AI-Powered Learning
                        </div>
                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                            Your Digital Library, Reimagined
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Access a vast collection of academic books, past exam papers, and career resources. All powered by AI to help you study smarter.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/login">
                                <span>Login & Explore</span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                     <div 
                        className={`transition-all duration-700 ease-out delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    >
                        <img
                          src="https://img.freepik.com/free-photo/luxury-reading-material-illuminates-old-fashioned-elegance-indoors-generated-by-ai_188544-37881.jpg?t=st=1754374179~exp=1754377779~hmac=7a5c2919d49c97dcfae3958a25f342432628a3dae7d717450cdf1995b936a3db&w=826"
                          alt="B-Tech Hub Platform"
                          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                          data-ai-hint="library technology"
                        />
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Features</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to succeed in your B.Tech course.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <Card key={index} className="flex flex-col justify-start items-start p-6 bg-background border-primary/20 hover:border-primary/80 hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)] transition-all">
                                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardHeader className="p-0">
                                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-2">
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                             <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Have questions? We've got answers.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto max-w-3xl w-full mt-12">
                            <Accordion type="single" collapsible className="w-full">
                                {faqItems.map((item, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                                Ready to Transform Your Learning?
                            </h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join thousands of students who are already using B-Tech Hub to excel in their academic journey.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <Button asChild size="lg">
                                <Link href="/login">
                                    Get Started Today
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <div className="flex items-center gap-2">
                    <BookMarked className="h-6 w-6 text-primary" />
                    <p className="text-md font-bold font-headline">B-Tech Hub</p>
                </div>
                <p className="text-xs text-muted-foreground sm:ml-auto">
                    Your gateway to academic excellence and community learning.
                </p>
            </footer>
        </div>
    );
}
