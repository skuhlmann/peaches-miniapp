import { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  hash?: `0x${string}`;
  isPending?: boolean;
  error?: Error;
  successElement?: React.ReactNode;
  onSuccess?: () => void;
}

export default function TransactionDrawer({
  isOpen,
  onClose,
  title,
  children,
  hash,
  isPending,
  error,
  successElement,
  onSuccess,
}: TransactionDrawerProps) {
  const {
    isLoading,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  console.log("receipt", receipt);

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-black rounded-t-3xl p-6 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-brand-blue">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {children}

          {/* Transaction Status */}
          <div className="mt-6 space-y-4">
            {isPending && (
              <div className="flex items-center gap-2 text-brand-blue">
                <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                <span>Waiting for wallet confirmation...</span>
              </div>
            )}

            {(isLoading || isPending) && (
              <div className="flex items-center gap-2 text-brand-blue">
                <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                <span>Transaction in progress...</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-green-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Transaction successful!</span>
                </div>
                {successElement}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{error.message}</span>
              </div>
            )}

            {hash && (
              <a
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-blue hover:text-brand-blue/80"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>View on BaseScan</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
