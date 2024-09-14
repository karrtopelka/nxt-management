import {
  Home,
  LineChart,
  LoaderPinwheel,
  PanelLeft,
  Settings,
  Users2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type MenuItem = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
};

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    name: 'home',
    icon: Home,
    href: '/dashboard',
  },
  {
    name: 'players',
    icon: Users2,
    href: '/players',
  },
  {
    name: 'trainings',
    icon: LoaderPinwheel,
    href: '/trainings',
  },
];

const BaseTemplate = ({ children }: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/dashboard"
            className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:size-8 md:text-base"
          >
            <Image
              src="/assets/images/logo.png"
              width={16}
              height={16}
              alt="NXT-logo"
              className="overflow-hidden rounded-full"
            />
            <span className="sr-only">NXT</span>
          </Link>
          {MAIN_MENU_ITEMS.map(item => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                >
                  <item.icon className="size-5" />
                  <span className="sr-only">{t(`menu.${item.name}`)}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{t(`menu.${item.name}`)}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
              >
                <Settings className="size-5" />
                <span className="sr-only">{t(`menu.settings`)}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{t(`menu.settings`)}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/user-profile"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
              >
                <Image
                  src="/assets/images/placeholder.png"
                  width={16}
                  height={16}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
                <span className="sr-only">{t(`menu.account`)}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{t(`menu.account`)}</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">{t('menu.toggle')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                {MAIN_MENU_ITEMS.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="size-5" />
                    {t(`menu.${item.name}`)}
                  </Link>
                ))}
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="size-5" />
                  {t('menu.settings')}
                </Link>
                <Link
                  href="/user-profile"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Image
                    src="/assets/images/placeholder.png"
                    width={16}
                    height={16}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                  {t('menu.account')}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link
            href="/dashboard"
            className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:hidden"
          >
            <Image
              src="/assets/images/logo.png"
              width={16}
              height={16}
              alt="NXT-logo"
              className="overflow-hidden rounded-full"
            />
            <span className="sr-only">NXT</span>
          </Link>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export { BaseTemplate };
