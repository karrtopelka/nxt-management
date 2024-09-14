import { auth } from '@clerk/nextjs/server';

import type { Roles } from '@/types/global';

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  const metadata = sessionClaims?.metadata as { role: Roles };
  return metadata?.role === role;
};
