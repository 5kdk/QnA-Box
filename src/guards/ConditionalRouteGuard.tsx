import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';

interface ConditionalRouteGuardProps {
  target: string;
  access: string[];
  redirectTo: string;
  children: ReactNode;
}

const ConditionalRouteGuard = ({ target, access, redirectTo, children }: ConditionalRouteGuardProps) => {
  const params = useParams();

  if (!access.includes(params[target] || '')) return <Navigate to={redirectTo} />;

  return children;
};

export default ConditionalRouteGuard;
