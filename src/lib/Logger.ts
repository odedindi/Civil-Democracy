import { Env } from '@/env';
import logtail from '@logtail/pino';
import pino, { type DestinationStream } from 'pino';
import pretty from 'pino-pretty';

let stream: DestinationStream;

if (Env.LOGTAIL_SOURCE_TOKEN) {
  stream = pino.multistream([
    await logtail({
      sourceToken: Env.LOGTAIL_SOURCE_TOKEN,
      options: {
        sendLogsToBetterStack: true,
      },
    }),
    {
      stream: pretty(), // Prints logs to the console
    },
  ]);
} else {
  stream = pretty({
    colorize: true,
  });
}

export const logger = pino({ base: undefined }, stream);