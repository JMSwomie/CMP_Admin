import { ReactNode } from 'react';
import { useRole } from '../../../hooks';

type Props = {
  children: ReactNode;
  arrRole: string[];
};

export const HasRole = ({ children, arrRole }: Props) => {
  const userRole = useRole();
  const isAllow = arrRole.find((role) => role === userRole);

  return isAllow === userRole ? <>{children}</> : null;
};
