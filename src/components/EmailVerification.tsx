import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

export function EmailVerification() {
  const { user, isEmailVerified, sendVerificationEmail } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    try {
      setSending(true);
      setError(null);
      await sendVerificationEmail();
      setSent(true);
    } catch (err) {
      setError('Failed to send verification email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!user || isEmailVerified) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
          <Mail className="text-yellow-500" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">Verify your email</h3>
          <p className="text-slate-300 text-sm mb-4">
            Please check your email ({user.email}) and click the verification link to complete your registration.
          </p>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          {sent && (
            <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
              <CheckCircle size={16} />
              Verification email sent! Please check your inbox.
            </div>
          )}
          <button
            onClick={handleResend}
            disabled={sending}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}