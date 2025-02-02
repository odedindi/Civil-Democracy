import { MoveRight, PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { AppConfig } from '@/lib/config';
import { motion } from 'framer-motion';

const titles = AppConfig.name.split(' ');

function Hero() {
  const t = useTranslations();

  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
              <span>This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -165 : 165,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              {t('BaseTemplate.description')}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="size-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
