import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { seo } from '~/utils/seo';

const homePageTitle = 'Kart Royale — a 3D kart racer in your browser';
const homePageDescription =
  'Pick one of eight racers and take on seven AI rivals over three laps of Sunset Bay Circuit, with drifts, boosts and items. Plays with a keyboard, a gamepad or touch.';
const gameStarted = { current: false };

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: homePageTitle,
        description: homePageDescription
      })
    ]
  }),
  component: KartRoyaleGame
});

function Home() {
  return (
    <div className='flex min-h-[100dvh] flex-col bg-background'>
      <header className='w-full'>
        <div className='container mx-auto flex h-16 items-center justify-end px-6 sm:px-8'>
          <Button variant='ghost' asChild>
            <Link to='/sign-in'>Sign in</Link>
          </Button>
        </div>
      </header>

      <main className='flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-8'>
        <div className='mx-auto flex max-w-4xl flex-col items-center gap-8'>
          <div className='space-y-4'>
            <h1 className='text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl'>
              {homePageTitle}
            </h1>
            <p className='text-balance text-lg text-muted-foreground sm:text-xl md:text-2xl'>
              Get started by chatting with AI
            </p>
          </div>

          <Button size='lg' asChild className='mt-4 rounded-full px-8'>
            <a
              href='https://layerwise.app'
              target='_blank'
              rel='noopener noreferrer'
            >
              Get Started
            </a>
          </Button>
        </div>
      </main>

      <footer className='w-full border-t'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground sm:gap-8'>
            <Button
              variant='link'
              size='sm'
              asChild
              className='h-auto p-0 text-foreground'
            >
              <a
                href='https://layerwise.app'
                target='_blank'
                rel='noopener noreferrer'
              >
                Home
              </a>
            </Button>
            <Separator orientation='vertical' className='h-4' />
            <Button
              variant='link'
              size='sm'
              asChild
              className='h-auto p-0 text-foreground'
            >
              <a
                href='https://layerwise.app/docs'
                target='_blank'
                rel='noopener noreferrer'
              >
                Docs
              </a>
            </Button>
            <Separator orientation='vertical' className='h-4' />
            <Button
              variant='link'
              size='sm'
              asChild
              className='h-auto p-0 text-foreground'
            >
              <a
                href='https://layerwise.app/support'
                target='_blank'
                rel='noopener noreferrer'
              >
                Support
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const BOOT_SCREEN_STYLE = `
#boot{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:radial-gradient(120% 90% at 50% 8%,#2c3560 0%,#141a33 42%,#080b16 100%);color:#f3f6fb;transition:opacity .55s ease;font-family:system-ui,-apple-system,sans-serif}
#boot.done{opacity:0;pointer-events:none}
.boot-in{display:flex;flex-direction:column;align-items:center;gap:3.4vmin}
.boot-mark{font-size:8.2vmin;font-weight:900;letter-spacing:.1em;line-height:.96;display:flex;flex-direction:column;align-items:center;background:linear-gradient(180deg,#fff 12%,#ffd27a 58%,#f0a23c 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 3px 10px rgba(0,0,0,.55))}
.boot-mark span{font-size:.52em;letter-spacing:.38em;margin-left:.38em}
.boot-bar{width:42vmin;max-width:380px;height:5px;border-radius:999px;background:rgba(255,255,255,.13);overflow:hidden}
.boot-bar i{display:block;width:0%;height:100%;border-radius:999px;background:linear-gradient(90deg,#6ad2ff,#ffd27a);transition:width .3s ease;box-shadow:0 0 12px rgba(255,200,120,.7)}
.boot-step{font-size:2.5vmin;letter-spacing:.22em;text-transform:uppercase;color:rgba(233,240,250,.62);min-height:1.2em}
@media (prefers-reduced-motion:reduce){#boot,.boot-bar i{transition:none}}
`;

function KartRoyaleGame() {
  useEffect(() => {
    if (gameStarted.current) return;
    gameStarted.current = true;
    void import('~/game-engine/main');
  }, []);

  return (
    <>
      <style>{BOOT_SCREEN_STYLE}</style>
      <div
        id='app'
        className='fixed inset-0 touch-none overscroll-none select-none bg-[#05070d] [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:touch-none'
      />
      <div
        id='ui'
        className='pointer-events-none fixed inset-0 z-10'
      />
      <div
        id='boot'
        className='fixed inset-0 grid place-items-center bg-[#080b16] text-[#f3f6fb]'
      >
        <div className='boot-in'>
          <div className='boot-mark'>
            KART
            <span>ROYALE</span>
          </div>
          <div className='boot-bar'>
            <i />
          </div>
          <div className='boot-step'>starting up</div>
        </div>
      </div>
    </>
  );
}
