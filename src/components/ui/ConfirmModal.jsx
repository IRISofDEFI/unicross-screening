import { useEffect } from 'react';
import ActionButton from './ActionButton';

export default function ConfirmModal({
  isOpen,
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  confirmVariant = 'danger',
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onCancel?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a2332] px-5 py-4">
          <h2 className="text-white font-semibold text-sm tracking-wide">{title}</h2>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex justify-end gap-2">
          <ActionButton variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </ActionButton>
          <ActionButton variant={confirmVariant} size="sm" onClick={onConfirm}>
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
