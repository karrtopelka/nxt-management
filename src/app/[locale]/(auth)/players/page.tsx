import { clerkClient } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';

import { SearchUsers } from '@/components/search-users';
import type { Roles } from '@/types/global';
import { checkRole } from '@/utils/roles';

import { setRole } from './_actions';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Players = async (params: { searchParams: { search?: string } }) => {
  const isAdmin = checkRole('admin');
  const query = params.searchParams.search;

  const users = (await clerkClient().users.getUserList({ query })).data;

  return (
    <div>
      <SearchUsers />
      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>
              {user.firstName}
              {' '}
              {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)
                  ?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as Roles}</div>
            {user.publicMetadata.role === 'admin' && isAdmin
              ? (
                  <div>
                    <form action={setRole}>
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="moderator" name="role" />
                      <button type="submit">Make User</button>
                    </form>
                  </div>
                )
              : (
                  <div>
                    <form action={setRole}>
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="admin" name="role" />
                      <button type="submit">Make Admin</button>
                    </form>
                  </div>
                )}

          </div>
        );
      })}
    </div>
  );
};

export default Players;
