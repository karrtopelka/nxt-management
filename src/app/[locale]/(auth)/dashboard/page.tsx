import { SignOutButton } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { Hello } from '@/components/Hello';
import { Button } from '@/components/ui/button';
import { checkRole } from '@/utils/roles';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Dashboard = async () => {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole('admin')) {
    return (
      <div className="[&_p]:my-6">
        <p>You are not admin</p>
        <Hello />
        <SignOutButton>
          <Button>
            Sign out
          </Button>
        </SignOutButton>
      </div>
    );
  }

  return (
    <div>
      <p>You are admin</p>
      <Hello />
      <SignOutButton>
        <Button>
          Sign out
        </Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
