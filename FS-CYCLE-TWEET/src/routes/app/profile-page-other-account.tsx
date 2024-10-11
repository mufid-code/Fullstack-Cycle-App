import { ProfileBarRight } from '../../features/Profile-page/component/profile-bar-right';
import { MainLayout } from '../../component/layout/app-main-layout';
import ProfileOtherPage from '../../features/Profile-page/component/profile-other-page';

export default function ProfileOtherRoute() {
  return (
    <MainLayout
      mainContent={
        <>
          <ProfileOtherPage />
        </>
      }
      rightContent={
        <>
          <ProfileBarRight />
        </>
      }
    />
  );
}
