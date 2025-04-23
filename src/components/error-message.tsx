
import { AlertOctagon } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className = '',
}: ErrorMessageProps) {
  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}
    >
      <div className="flex gap-3">
        <AlertOctagon className="text-red-500 flex-shrink-0" size={20} />
        <div>
          <h4 className="text-red-800 font-medium">Error</h4>
          <p className="text-red-600 text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}