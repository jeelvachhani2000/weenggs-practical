interface Props {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: Props) => (
  <div className="text-center py-16" role="alert">
    <p className="text-5xl mb-3">⚠️</p>
    <p className="text-red-500 font-medium mb-3">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;
