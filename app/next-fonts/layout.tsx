import NavLink from '@/components/NavLink/NavLink';

import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={'content-container'}>
      <h1>Fonts</h1>

      <p className={'nav'}>
        <NavLink href={'/next-fonts/google'}>Google Fonts</NavLink>
        <NavLink href={'/next-fonts/variable'}>CSS Variable</NavLink>
        <NavLink href={'/next-fonts/local'}>Local</NavLink>
      </p>

      <hr />

      {children}
    </div>
  );
};

export default Layout;
