import { clsx } from 'clsx';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-gray-100 shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={clsx('px-5 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }) {
  return (
    <div className={clsx('px-5 py-4', className)}>
      {children}
    </div>
  );
};